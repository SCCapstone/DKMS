import { doc, getDoc } from "firebase/firestore";
import { notFound } from "next/navigation";

import FollowButton from "@/components/FollowButton";
import ProfileHead from "@/components/profile/ProfileHead";
import TopItems from "@/components/profile/TopItems";
import { profilesCol } from "@/lib/firestore";
import isUserFollowing from "@/lib/followers/isUserFollowing";
import getSpotifyData from "@/lib/getSpotifyData";
import {
  getCurrentUser,
  getIdFromUsername,
  getUserFromId,
} from "@/lib/getUser";

const getDkmsProfile = async (profileId: string) => getUserFromId(profileId);

const getSpotifyProfile = async (username: string) =>
  getSpotifyData<SpotifyApi.UserProfileResponse>(
    `https://api.spotify.com/v1/users/${username}`,
    { cache: "no-cache" }
  );

const getTopItems = async (id: string) => {
  const profileDoc = await getDoc(doc(profilesCol, id));
  if (!profileDoc.exists()) {
    notFound();
  }

  return profileDoc.data();
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

  const data = await getTopItems(profileId);

  return (
    <>
      <ProfileHead
        displayName={dkmsProfile.displayName}
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
      <TopItems artists={data.topArtists} tracks={data.topTracks} />
    </>
  );
};

export default Profile;
