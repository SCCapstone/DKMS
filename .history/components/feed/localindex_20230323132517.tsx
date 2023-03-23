import { useEffect, useState } from "react";

import FeedItem from "./FeedItem";
import FeedTextBox from "./FeedTextBox";

import type { FirestoreFeedItem } from "@/lib/firestore/types";
import type { User } from "next-auth";

import isUserFollowing from "@/lib/isUserFollowing";

export type FeedCommentType = {
  id: string;
} & FirestoreFeedItem;

export type FeedItemType = {
  id: string;
  comments: FeedCommentType[];
  userId: string; // assuming there is a userId field in FirestoreFeedItem
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
  const [followedUsers, setFollowedUsers] = useState<string[]>([]);

  useEffect(() => {
    const fetchFollowedUsers = async () => {
      const response = await isUserFollowing(currentUser.name);
      if (response) {
        setFollowedUsers([currentUser.name]);
      } else {
        setFollowedUsers([]);
      }
    };
    fetchFollowedUsers();
  }, [currentUser]);

  const filteredData = followedUsers.length
    ? data.filter((feedItem) => followedUsers.includes(feedItem.userId))
    : [];

  return (
    <div>
      {showLinks && (
        <>
          <FeedTextBox user={currentUser} />
          <div className="divider" />
        </>
      )}
      <ul>
        {filteredData.map((feedItem) => (
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
};

export default FeedPage;
