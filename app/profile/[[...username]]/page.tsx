import { getFeedContent } from "lib/feed";
import { getUsername, getUser } from "utils/getUser";

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
  const currentUsername = await getUsername();
  const username = params.username?.[0] ?? currentUsername;

  const profile = await getUserProfile(username);

  const followers = profile.followers?.total ?? 0;

  const data = await getFeedContent(profile.id);

  const currentUser = await getUser();
  return (
    <div>
      <PageTitle title="Profile" />
      <div className="flex flex-row items-center">
        {/* @ts-expect-error Server Component */}
        <ProfileImg username={username} isProfilePage />
        <div className="flex flex-col">
          <h1 className="normal-case font-bold">Profile — {username}</h1>
          <h2 className="normal-case">
            {formatFollowers(followers)} followers
          </h2>
        </div>
      </div>
      <div className="divider" />
      <FeedPage user={currentUser} data={data} />
    </div>
  );
};

export default Profile;
