import { notFound } from "next/navigation";

import FollowButton from "@/components/FollowButton";
import AudioFeatures from "@/components/music/AudioFeatures";
import {
  ArtistsGrid,
  PlaylistsGrid,
  TracksGrid,
} from "@/components/music/grids";
import ProfileHead from "@/components/profile/ProfileHead";
import fetchServer from "@/lib/fetch/fetchServer";
import { getCachedProfileDoc } from "@/lib/firestore/cache";
import isUserFollowing from "@/lib/followers/isUserFollowing";
import getAverageAudioFeatures from "@/lib/getAverageAudioFeatures";
import getPlaylistsForUser from "@/lib/getPlaylistsForUser";
import {
  getCurrentUser,
  getCurrentUserPremium,
  getIdFromUsername,
  getUserFromId,
} from "@/lib/getUser";
import getRecommendationsForUser from "@/lib/recommendations/getRecommendationsForUser";

/* Fetch profile data from DKMS database */
const getDkmsProfile = async (profileId: string) => getUserFromId(profileId);

/* Fetch profile data from Spotify API */
const getSpotifyProfile = async (username: string) =>
  fetchServer<SpotifyApi.UserProfileResponse>(
    `https://api.spotify.com/v1/users/${username}`,
    { cache: "no-cache" }
  );

/* Get data for profile */
const getData = async (id: string) => {
  const profileDoc = await getCachedProfileDoc(id);
  if (!profileDoc.exists()) {
    notFound();
  }

  const data = profileDoc.data();

  const { topTracks } = data;

  /* Get recommendations for user */
  const recommendations = await getRecommendationsForUser(id, 8);

  if (topTracks.length === 0) {
    return { data, averageAudioFeatures: undefined, recommendations };
  }

  /* Fetch audio feature data for user */
  const audioFeatures =
    await fetchServer<SpotifyApi.MultipleAudioFeaturesResponse>(
      `https://api.spotify.com/v1/audio-features?ids=${topTracks
        .map((track) => track.id)
        .join(",")}`
    ).then((res) => res.audio_features);

  const averageAudioFeatures = getAverageAudioFeatures(audioFeatures);

  return { data, averageAudioFeatures, recommendations };
};

const Profile = async ({ params }: { params: { username: string } }) => {
  const currentUser = await getCurrentUser();
  const currentUsername = currentUser.username;
  const { username } = params;

  const profileId = await getIdFromUsername(username);
  if (!profileId) {
    notFound();
  }
  const isCurrentUser = username === currentUsername;

  const dkmsProfile = await getDkmsProfile(profileId);
  const spotifyData = await getSpotifyProfile(username);
  const isPrivate = dkmsProfile.visibility === "private";

  const hideUser = !isCurrentUser && isPrivate;

  const isFollowed = await isUserFollowing(username, "user");
  if (hideUser) {
    return (
      <>
        <ProfileHead
          displayName={dkmsProfile.name}
          username={username}
          followers={spotifyData.followers?.total}
          link={spotifyData.external_urls.spotify}
        />
        <FollowButton
          isFollowing={isFollowed}
          username={username}
          followType="user"
        />
        <div className="divider" />
        <div className="alert alert-warning shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>This user is private!</span>
          </div>
        </div>
      </>
    );
  }

  const usersPlaylists = await getPlaylistsForUser(username, 8);

  const { data, averageAudioFeatures, recommendations } = await getData(
    profileId
  );

  const { topTracks, topArtists } = data;
  const notEnoughData =
    topTracks.length === 0 || topArtists.length === 0 || !averageAudioFeatures;
  const isPremium = await getCurrentUserPremium();

  /* Layout if there are 0 tracks or artists or there are no audio features available */
  if (notEnoughData) {
    return (
      <>
        <ProfileHead
          displayName={dkmsProfile.name}
          username={username}
          followers={spotifyData.followers?.total}
          link={spotifyData.external_urls.spotify}
        />
        <FollowButton
          isFollowing={isFollowed}
          username={username}
          followType="user"
        />
        <div className="divider" />
        <div className="alert alert-info shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current flex-shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              This user does not have any top music! Encourage them to listen to
              more on Spotify :)
            </span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ProfileHead
        displayName={dkmsProfile.name}
        username={username}
        followers={spotifyData.followers?.total}
        link={spotifyData.external_urls.spotify}
      />
      {!isCurrentUser && (
        <FollowButton
          isFollowing={isFollowed}
          username={username}
          followType="user"
        />
      )}
      <div className="divider" />
      <h4 className="font-black uppercase pb-2">Top Songs Statistics</h4>
      <AudioFeatures audioFeatures={averageAudioFeatures} />
      <div className="divider" />
      <div className="grid md:grid-cols-2 gap-4 pb-5">
        <div>
          <h4 className="font-black uppercase pb-2">Top Songs</h4>
          <TracksGrid
            tracks={data.topTracks.splice(0, 6)}
            isHalf
            isPremium={isPremium}
          />
        </div>
        <div>
          <h4 className="font-black uppercase pb-2">Top Artists</h4>
          <ArtistsGrid
            artists={data.topArtists.splice(0, 8)}
            isHalf
            isPremium={isPremium}
          />
        </div>
      </div>
      <div>
        <h4 className="font-black uppercase pb-2">Playlists</h4>
        <PlaylistsGrid playlists={usersPlaylists.items} isPremium={isPremium} />
      </div>
      <div className="divider" />
      <h4 className="font-black uppercase pb-2">Similar Music</h4>
      <TracksGrid tracks={recommendations.tracks} isPremium={isPremium} />
    </>
  );
};

export default Profile;
