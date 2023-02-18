import { getUsername, getUser } from "utils/getUser";

import FeedPage from "../../../components/feed/FeedPage";
import PageTitle from "../../../components/ui/PageTitle";
import { formatFollowers } from "../../../lib/formatters";
import { getFeedContent } from "../../../pages/api/feedContent/[id]";

const Profile = async ({ params }: { params: { username?: string[] } }) => {
  const username = params.username ? params.username[0] : await getUsername();

  const user = await getUser();

  const data = await getFeedContent(username);
  return (
    <div>
      <PageTitle
        title={`Profile — ${username}`}
        subtitle={`${formatFollowers(user.totalFollowers)} followers`}
      />
      <FeedPage data={data} />
    </div>
  );
};

export default Profile;
