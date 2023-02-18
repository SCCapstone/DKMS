import FeedPage from "../../components/feed/FeedPage";
import PageTitle from "../../components/ui/PageTitle";
import { getFeedContent } from "../../pages/api/feedContent/[id]";

import type { FeedItemContent } from "../../components/feed/FeedPage";

const Feed = async () => {
  const data: FeedItemContent[] = await getFeedContent();

  return (
    <div>
      <PageTitle title="Feed" />
      <FeedPage data={data} showLinks />
    </div>
  );
};

export default Feed;
