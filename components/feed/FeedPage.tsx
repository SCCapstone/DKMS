import FeedItem from "./FeedItem";

export type FeedItemContent = {
  id: string;
  data: { username: string; content: string };
};

const FeedPage = ({ data }: { data: FeedItemContent[] }) => (
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
