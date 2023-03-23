import { useEffect, useState } from "react";

import isUserFollowing from "@/lib/getSpotifyData";

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
  const [followedUsers, setFollowedUsers] = useState<string[]>([]);

  useEffect(() => {
    async function fetchFollowedUsers() {
      const followed = await isUserFollowing(currentUser.username);
      setFollowedUsers(followed ? [currentUser.username] : []);
    }
    fetchFollowedUsers();
  }, [currentUser.username]);

  const filteredData = followedUsers.length
    ? data.filter((item) => followedUsers.includes(item.username))
    : data;

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
