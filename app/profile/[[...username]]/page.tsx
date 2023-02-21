import { getUsername, getUser } from "utils/getUser";

import FeedPage from "../../../components/feed/FeedPage";
import PageTitle from "../../../components/ui/PageTitle";
import { formatFollowers } from "../../../lib/formatters";
import { getFeedContent } from "../../../pages/api/feedContent/[id]";

import type { FeedItemContent } from "../../../components/feed/FeedPage";
import type { User } from "next-auth";

const Profile = async ({ params }: { params: { username?: string[] } }) => {
  const username: string = params.username
    ? params.username[0]
    : await getUsername();

  const user: User = await getUser();

  const data: FeedItemContent[] = await getFeedContent(user.id);
  return (
    <div>
      <PageTitle
        title={`Profile — ${username}`}
        subtitle={`${formatFollowers(user.totalFollowers)} followers`}
      />
      <FeedPage data={data} user={user} />
    </div>
  );
};

export default Profile;
