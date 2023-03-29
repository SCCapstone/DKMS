import { doc, getDoc } from "firebase/firestore";
import { notFound } from "next/navigation";

import FollowButton from "@/components/FollowButton";
import AudioFeatures from "@/components/music/AudioFeatures";
import ProfileHead from "@/components/profile/ProfileHead";
import TopItems from "@/components/profile/TopItems";
import fetchServer from "@/lib/fetch/fetchServer";
import { profilesCol } from "@/lib/firestore";
import isUserFollowing from "@/lib/followers/isUserFollowing";
import getAverageAudioFeatures from "@/lib/getAverageAudioFeatures";
import {
  getCurrentUser,
  getIdFromUsername,
  getUserFromId,
} from "@/lib/getUser";

const getDkmsProfile = async (profileId: string) => getUserFromId(profileId);

const getSpotifyProfile = async (username: string) =>
  fetchServer<SpotifyApi.UserProfileResponse>(
    `https://api.spotify.com/v1/users/${username}`,
    { cache: "no-cache" }
  );

const getTopItems = async (id: string) => {
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

  const averageAudioFeatures = getAverageAudioFeatures(audioFeatures);

  return { data, averageAudioFeatures };
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

  const showFollowButton = username !== currentUsername;

  const { data, averageAudioFeatures } = await getTopItems(profileId);

  return (
    <>
      <ProfileHead
        displayName={dkmsProfile.name}
        username={username}
        followers={spotifyData.followers?.total}
        link={spotifyData.external_urls.spotify}
      />
      {showFollowButton && (
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
      <TopItems artists={data.topArtists} tracks={data.topTracks} />
    </>
  );
};

export default Profile;
