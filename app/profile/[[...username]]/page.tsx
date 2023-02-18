import FeedPage from "../../../components/feed/FeedPage";
import { getFeedContent } from "../../../pages/api/feedContent/[id]";
import getUser from "../../../utils/getUser";

const Profile = async ({ params }: { params: { username?: string[] } }) => {
  const username = params.username ? params.username[0] : await getUser();

  const data = await getFeedContent(username);
  return (
    <div>
      <h1 className="normal-case font-bold">Profile — {username}</h1>
      <FeedPage data={data} />
    </div>
  );
};

export default Profile;
