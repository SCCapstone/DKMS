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
    <form>
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <textarea
            id="comment"
            className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write your musical thoughts..."
            required
          />
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium bg-primary text-center text-white rounded-lg focus:ring-4 "
          >
            Post
          </button>
        </div>
      </div>
    </form>
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
