import FeedPage from "../../components/feed/FeedPage";
import { getFeedContent } from "../../pages/api/feedContent/[id]";

import type { FeedItemContent } from "../../components/feed/FeedPage";

const Feed = async () => {
  const data: FeedItemContent[] = await getFeedContent(undefined);

  return (
    <div>
      <h1 className="normal-case font-bold">Feed</h1>
      <FeedPage data={data} showLinks />
    </div>
  );
};

export default Feed;
