import { getFeedContent } from "lib/feed";
import getUser from "utils/getUser";

import FeedPage from "../../components/feed/FeedPage";
import PageTitle from "../../components/ui/PageTitle";

import type { FeedItemContent } from "../../components/feed/FeedPage";

const Feed = async () => {
  const data: FeedItemContent[] = await getFeedContent();
  const user = await getUser();

  return (
    <div>
      <PageTitle title="Feed" />
      <FeedPage data={data} user={user} showLinks />
    </div>
  );
};

export default Feed;
