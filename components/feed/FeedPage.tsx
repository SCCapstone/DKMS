import FeedItem from "./FeedItem";
import FeedTextBox from "./FeedTextBox";

import type { User } from "next-auth";

export type FeedComment = {
  id: string;
  username: string;
  comment: string;
  createTime: Date;
};

export type FeedItemContent = {
  id: string;
  data: {
    username: string;
    content: string;
    comments: FeedComment[];
    createTime: Date;
  };
};

const FeedPage = ({
  data,
  showLinks,
  user,
}: {
  data: FeedItemContent[];
  showLinks?: boolean;
  user: User;
}) => (
  <div>
    <FeedTextBox userId={user.id} />
    <div className="divider" />
    <ul>
      {data.map((feedItem) => (
        <FeedItem
          key={feedItem.id}
          currentUser={user}
          docId={feedItem.id}
          username={feedItem.data.username}
          feedContent={feedItem.data.content}
          showLink={showLinks}
          comments={feedItem.data.comments}
        />
      ))}
    </ul>
  </div>
);

export default FeedPage;
