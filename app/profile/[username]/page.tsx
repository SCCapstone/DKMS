import { doc, getDoc } from "firebase/firestore";
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
import { profilesCol } from "@/lib/firestore";
import isUserFollowing from "@/lib/followers/isUserFollowing";
import getAverageAudioFeatures from "@/lib/getAverageAudioFeatures";
import getPlaylistsForUser from "@/lib/getPlaylistsForUser";
import {
  getCurrentUser,
  getIdFromUsername,
  getUserFromId,
} from "@/lib/getUser";
import getRecommendationsForUser from "@/lib/recommendations/getRecommendationsForUser";

const getDkmsProfile = async (profileId: string) => getUserFromId(profileId);

const getSpotifyProfile = async (username: string) =>
  fetchServer<SpotifyApi.UserProfileResponse>(
    `https://api.spotify.com/v1/users/${username}`,
    { cache: "no-cache" }
  );

const getData = async (id: string) => {
  const profileDoc = await getDoc(doc(profilesCol, id));
  if (!profileDoc.exists()) {
    notFound();
  }

  const data = profileDoc.data();

  const audioFeatures =
    await fetchServer<SpotifyApi.MultipleAudioFeaturesResponse>(
      `https://api.spotify.com/v1/audio-features?ids=${data.topTracks
        .map((track) => track.id)
        .join(",")}`
    );

  const recommendations = await getRecommendationsForUser(id, 8);

  const averageAudioFeatures = getAverageAudioFeatures(audioFeatures);

  return { data, averageAudioFeatures, recommendations };
};

const Profile = async ({ params }: { params: { username: string } }) => {
  const currentUsername = (await getCurrentUser()).username;
  const { username } = params;

  const profileId = await getIdFromUsername(username);
  if (!profileId) {
    notFound();
  }

  const dkmsProfile = await getDkmsProfile(profileId);
  const spotifyData = await getSpotifyProfile(username);

  const isFollowed = await isUserFollowing(username, "user");

  const isCurrentUser = username === currentUsername;

  const usersPlaylists = await getPlaylistsForUser(username, 8);

  const { data, averageAudioFeatures, recommendations } = await getData(
    profileId
  );

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
      <div className="grid md:grid-cols-3 gap-4 pb-5">
        <div>
          <h4 className="font-black uppercase pb-2">Top Songs</h4>
          <TracksGrid tracks={data.topTracks.splice(0, 6)} isHalf />
        </div>
        <div>
          <h4 className="font-black uppercase pb-2">Top Artists</h4>
          <ArtistsGrid artists={data.topArtists.splice(0, 8)} isHalf />
        </div>
        <div>
          <h4 className="font-black uppercase pb-2">User&apos;s Playlist</h4>
          <PlaylistsGrid playlists={usersPlaylists.items} isHalf />
        </div>
      </div>
      {!isCurrentUser && (
        <>
          <div className="divider" />
          <h4 className="font-black uppercase pb-2">Similar Music</h4>
          <TracksGrid tracks={recommendations.tracks} />
        </>
      )}
    </>
  );
};

export default Profile;
