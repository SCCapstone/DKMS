import { notFound } from "next/navigation";

import FollowButton from "@/components/profile/FollowButton";
import PageTitle from "@/components/ui/PageTitle";
import ProfileImg from "@/components/userProfile/profileImg";
import isUserFollowing from "@/lib/followers/isUserFollowing";
import { formatNumber } from "@/lib/formatters";
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
    <div>
      <PageTitle title="Profile" />
      <div className="flex flex-row items-center pb-4">
        {/* @ts-expect-error Server Component */}
        <ProfileImg username={username} isProfilePage />
        <div className="flex flex-col">
          <h1 className="normal-case font-bold">
            {!profile.displayName || username === profile.displayName
              ? username
              : `${profile.displayName} — ${username}`}
          </h1>
          <h2 className="normal-case">
            {formatNumber(profile.followers)} followers
          </h2>
        </div>
      </div>
      {showFollowButton && (
        <FollowButton isFollowing={isFollowed} username={username} />
      )}
      <div className="divider" />
    </div>
  );
};

export default Profile;
