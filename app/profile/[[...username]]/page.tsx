import FollowButton from "components/profile/FollowButton";
import { getFeedContent } from "lib/feed";
import isUserFollowing from "lib/followers/isUserFollowing";
import getUser from "utils/getUser";

import FeedPage from "../../../components/feed/FeedPage";
import PageTitle from "../../../components/ui/PageTitle";
import ProfileImg from "../../../components/userProfile/profileImg";
import { formatFollowers } from "../../../lib/formatters";
import getSpotifyData from "../../../lib/getSpotifyData";

const getUserProfile = async (username: string) =>
  getSpotifyData<SpotifyApi.UserProfileResponse>(
    `https://api.spotify.com/v1/users/${username}`
  );

const Profile = async ({ params }: { params: { username?: string[] } }) => {
  const currentUser = await getUser();
  const currentUsername = currentUser.username;
  const username = params.username?.[0] ?? currentUsername;

  const profile = await getUserProfile(username);
  const data = await getFeedContent(profile.id);

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
            {!profile.display_name || username === profile.display_name
              ? username
              : `${profile.display_name} — ${username}`}
          </h1>
          <h2 className="normal-case">
            {formatFollowers(profile.followers?.total)} followers
          </h2>
        </div>
      </div>
      {showFollowButton && (
        <FollowButton isFollowing={isFollowed} username={username} />
      )}
      <div className="divider" />
      <FeedPage user={currentUser} data={data} />
    </div>
  );
};

export default Profile;
