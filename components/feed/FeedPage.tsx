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
  <div>
    <div>
      <textarea
        id="message"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Share your musical thoughts..."
      />
    </div>
    <div className="divider" />
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
  </div>
);

export default FeedPage;
