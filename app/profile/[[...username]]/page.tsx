import { getUsername, getUser } from "utils/getUser";

import FeedPage from "../../../components/feed/FeedPage";
import PageTitle from "../../../components/ui/PageTitle";
import ProfileImg from "../../../components/userProfile/profileImg";
import { formatFollowers } from "../../../lib/formatters";
import getSpotifyData from "../../../lib/getSpotifyData";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import { getFeedContent } from "../../../pages/api/feedContent/[id]";
import db from "../../firebase";

import type { FeedItemContent } from "../../../components/feed/FeedPage";
import type { User } from "next-auth";

const getCurrentUsername = async () => {
  const user = await getUser();
  return user.id;
};

const getUserProfile = async (username: string) =>
  getSpotifyData<SpotifyApi.UserProfileResponse>(
    `https://api.spotify.com/v1/users/${username}`
  );

const Profile = async ({ params }: { params: { username?: string[] } }) => {
  const username: string = params.username
    ? params.username[0]
    : await getUsername();

  const profile = await getUserProfile(username);

  const followers = profile.followers?.total ?? 0;

  const user = await getUser();

  const data = await getFeedContent(user.id);
  return (
    <div>
      <PageTitle title="Profile" />
      <div className="flex flex-row">
        {/* @ts-expect-error Server Component */}
        <ProfileImg username={username} isProfilePage />
        <h1 className="normal-case font-bold mt-4">Profile — {username}</h1>
      </div>
      <h2 className="normal-case">{formatFollowers(followers)} followers</h2>
      <div className="divider" />
      <FeedPage user={user} data={data} />
    </div>
  );
};

export default Profile;
