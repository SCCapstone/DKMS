import FeedItem from "./FeedItem";

import type { FeedItemRename } from "../profile/page";

const FeedPage = ({ data }: { data: FeedItemRename[] }) => (
  <div>
    <div className="divider" />
    <ul>
      {data.map((feedItem) => (
        <FeedItem
          key={feedItem.id}
          username={feedItem.data.username}
          feedContent={feedItem.data.content}
        />
      ))}
    </ul>
  </div>
);

export default FeedPage;
