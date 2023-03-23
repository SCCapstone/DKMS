import { useState, useEffect } from "react";
import FeedItem from "./FeedItem";
import FeedTextBox from "./FeedTextBox";
import { isUserFollowing } from "@/lib/spotify";
import type { FirestoreFeedItem } from "@/lib/firestore/types";
import type { User } from "next-auth";

export type FeedCommentType = {
  id: string;
} & FirestoreFeedItem;

export type FeedItemType = {
  id: string;
  userIds: string[];
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
  const [filteredData, setFilteredData] = useState<FeedItemType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const followingIds = await getFollowingIds(currentUser.email);
      const filtered = data.filter((feedItem) =>
        feedItem.userIds.some((id) => followingIds.includes(id))
      );
      setFilteredData(filtered);
    };
    fetchData();
  }, [data, currentUser.email]);

  const getFollowingIds = async (username: string) => {
    const response = await isUserFollowing(username);
    return data.filter((following, index) => response[index]).map((following) => following.id);
  };

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
