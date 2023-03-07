import { notFound } from "next/navigation";

import FeedPage from "@/components/feed";
import FollowButton from "@/components/profile/FollowButton";
import PageTitle from "@/components/ui/PageTitle";
import ProfileImg from "@/components/userProfile/profileImg";
import { getFeedItems } from "@/lib/feed";
import isUserFollowing from "@/lib/followers/isUserFollowing";
import { formatFollowers } from "@/lib/formatters";
import { getCurrentUser, getUserByUsername } from "@/lib/getUser";

const Profile = async ({ params }: { params: { username?: string[] } }) => {
  const currentUser = await getCurrentUser();
  const currentUsername = currentUser.username;
  const username = params.username?.[0] ?? currentUsername;

  const profile = await getUserByUsername(username);
  if (!profile) {
    notFound();
  }
  const data = await getFeedItems(profile.id);

  const isFollowed = await isUserFollowing(profile.id);
  const showFollowButton = username !== currentUsername && params.username?.[0];

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
            {formatFollowers(profile.followers)} followers
          </h2>
        </div>
      </div>
      {showFollowButton && (
        <FollowButton isFollowing={isFollowed} username={username} />
      )}
      <div className="divider" />
      <FeedPage currentUser={currentUser} data={data} />
    </div>
  );
};

export default Profile;
