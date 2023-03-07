import FeedItem from "./FeedItem";
import FeedTextBox from "./FeedTextBox";

import type { FirestoreFeedItem } from "lib/firestore/types";
import type { User } from "next-auth";

export type FeedCommentType = {
  id: string;
} & FirestoreFeedItem;

export type FeedItemType = {
  id: string;
  comments: FeedCommentType[];
} & FirestoreFeedItem;

const FeedPage = ({
  data,
  currentUser,
  showLinks = false,
}: {
  data: FeedItemType[];
  currentUser: User;
  showLinks?: boolean;
}) => (
  <div>
    {showLinks && (
      <>
        <FeedTextBox user={currentUser} />
        <div className="divider" />
      </>
    )}
    <ul>
      {data.map((feedItem) => (
        <FeedItem
          key={feedItem.id}
          data={feedItem}
          currentUser={currentUser}
          showLink={showLinks}
        />
      ))}
    </ul>
  </div>
);

export default FeedPage;
