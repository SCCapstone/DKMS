import { doc, getDoc } from "firebase/firestore";
import { notFound } from "next/navigation";

import FollowButton from "@/components/profile/FollowButton";
import ProfileHead from "@/components/profile/ProfileHead";
import TopItems from "@/components/profile/TopItems";
import { profilesCol } from "@/lib/firestore";
import isUserFollowing from "@/lib/followers/isUserFollowing";
import { getCurrentUser, getUserByUsername } from "@/lib/getUser";

const getData = async (id: string) => {
  const profileDoc = await getDoc(doc(profilesCol, id));
  if (!profileDoc.exists()) {
    notFound();
  }

  return profileDoc.data();
};

const Profile = async ({ params }: { params: { username: string } }) => {
  const currentUser = await getCurrentUser();
  const currentUsername = currentUser.username;
  const { username } = params;

  const profile = await getUserByUsername(username);
  if (!profile) {
    notFound();
  }

  const isFollowed = await isUserFollowing(profile.id);
  const showFollowButton = username !== currentUsername;

  const data = await getData(profile.id);

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
