import FeedItem from "./FeedItem";

export type FeedItemContent = {
  id: string;
  data: { username: string; content: string };
};

const FeedPage = ({
  data,
  showLinks,
}: {
  data: FeedItemContent[];
  showLinks?: boolean;
}) => (
  <ul>
    {data.map((feedItem) => (
      <FeedItem
        key={feedItem.id}
        username={feedItem.data.username}
        feedContent={feedItem.data.content}
        showLink={showLinks}
      />
    ))}
  </ul>
);

export default FeedPage;
