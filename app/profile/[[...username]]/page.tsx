import { getServerSession } from "next-auth";

import FeedPage from "../../../components/feed/FeedPage";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import { getFeedContent } from "../../../pages/api/feedContent/[id]";

// TODO SOPHIE FIX THIS (make it a utility function so we can use it in other places)
const getUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("No session");
  }
  return session.user;
};

const getCurrentUsername = async () => {
  const user = await getUser();
  return user.id;
};

const Profile = async ({ params }: { params: { username?: string[] } }) => {
  const username = params.username
    ? params.username[0]
    : await getCurrentUsername();

  // const data = await feedRequestHandler("GET", username, undefined);
  const data = await getFeedContent(username);
  return (
    <div>
      <h1 className="normal-case font-bold">Profile — {username}</h1>
      <FeedPage data={data} />
    </div>
  );
};

export default Profile;
