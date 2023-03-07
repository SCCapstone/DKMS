import { notFound } from "next/navigation";

import FollowButton from "@/components/profile/FollowButton";
import ProfileHead from "@/components/profile/ProfileHead";
import isUserFollowing from "@/lib/followers/isUserFollowing";
import { getCurrentUser, getUserByUsername } from "@/lib/getUser";

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

  return (
    <>
      <ProfileHead user={profile} />
      {showFollowButton && (
        <FollowButton isFollowing={isFollowed} username={username} />
      )}
      <div className="divider" />
    </>
  );
};

export default Profile;
