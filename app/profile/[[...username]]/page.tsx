import { getUsername, getUser } from "utils/getUser";

import FeedPage from "../../../components/feed/FeedPage";
import PageTitle from "../../../components/ui/PageTitle";
import ProfileImg from "../../../components/userProfile/profileImg";
import { formatFollowers } from "../../../lib/formatters";
import { getFeedContent } from "../../../pages/api/feedContent/[id]";

import { getServerSession, User } from "next-auth";
import getSpotifyData from "../../../lib/getSpotifyData";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import db from "../../firebase";

import type { FeedItemContent } from "../../../components/feed/FeedPage";

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

  const data = await getFeedContent(profile.id);

  const currentUser = await getUser();
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
      <FeedPage user={currentUser} data={data} />
    </div>
  );
};

export default Profile;
