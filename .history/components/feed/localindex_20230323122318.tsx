import { useEffect, useState } from "react";
import FeedItem from "./FeedItem";
import FeedTextBox from "./FeedTextBox";

import type { FirestoreFeedItem } from "@/lib/firestore/types";
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
}) => {
  const [followingItems, setFollowingItems] = useState<FeedItemType[]>([]);

  useEffect(() => {
    const fetchFollowingItems = async () => {
      const followingUsernames = await Promise.all(
        data.map(async (item) => {
          const { username } = item.user;
          const isFollowing = await isUserFollowing(username);
          return isFollowing ? username : null;
        })
      );

      const filteredItems = data.filter(
        (item, index) => followingUsernames[index] !== null
      );

      setFollowingItems(filteredItems.slice(0, 15));
    };

    fetchFollowingItems();
  }, [data]);

  return (
    <div>
      {showLinks && (
        <>
          <FeedTextBox user={currentUser} />
          <div className="divider" />
        </>
      )}
      <ul>
        {followingItems.map((feedItem) => (
          <div key={feedItem.id}>
            <p>{feedItem.user.username} posted:</p>
            <p>{feedItem.content}</p>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default FeedPage;
