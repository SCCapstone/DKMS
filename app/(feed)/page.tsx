import FeedPage from "../../components/feed/FeedPage";
import { getFeedContent } from "../../pages/api/feedContent/[id]";
import PageTitle from "../../components/ui/PageTitle";

import type { FeedItemContent } from "../../components/feed/FeedPage";

const Feed = async () => {
  const data: FeedItemContent[] = await getFeedContent(undefined);

  return (
    <div>
      <PageTitle title="Feed" />
      <FeedPage data={data} showLinks />
    </div>
  );
};

export default Feed;
