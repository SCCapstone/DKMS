import FeedPage, { getUser } from "../../../components/feed/FeedPage";
import { getFeedContent } from "../../../pages/api/feedContent/[id]";

const Profile = async ({ params }: { params: { username?: string[] } }) => {
  const username = params.username ? params.username[0] : await getUser();

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
