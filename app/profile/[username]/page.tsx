import { doc, getDoc } from "firebase/firestore";
import { notFound } from "next/navigation";

import FollowButton from "@/components/profile/FollowButton";
import ProfileHead from "@/components/profile/ProfileHead";
import TopItems from "@/components/profile/TopItems";
import { profilesCol } from "@/lib/firestore";
import isUserFollowing from "@/lib/followers/isUserFollowing";
import getSpotifyData from "@/lib/getSpotifyData";
import { getCurrentUser, getIdFromUsername } from "@/lib/getUser";

const getProfileData = async (username: string) =>
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

  const profile = await getProfileData(username);

  const isFollowed = await isUserFollowing(username);

  const showFollowButton = username !== currentUsername;

  const data = await getTopItems(profileId);

  return (
    <>
      <ProfileHead user={profile} />
      {showFollowButton && (
        <FollowButton isFollowing={isFollowed} username={username} />
      )}
      <div className="divider" />
      <TopItems artists={data.topArtists} tracks={data.topTracks} />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  );
};

export default Profile;
