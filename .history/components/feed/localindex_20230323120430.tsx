import { useEffect, useState } from "react";

import FeedItem from "./FeedItem";
import FeedTextBox from "./FeedTextBox";

import type { FirestoreFeedItem } from "@/lib/firestore/types";
import type { User } from "next-auth";

import isUserFollowing from "/home/kn11/Documents/test/DKMS/lib/followers/isUserFollowing.ts";

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
  const [filteredData, setFilteredData] = useState<FeedItemType[]>([]);

  useEffect(() => {
    const fetchFilteredData = async () => {
      const filteredItems: FeedItemType[] = [];
      for (const item of data) {
        const isFollowing = await isUserFollowing(item.uid);
        if (isFollowing) {
          filteredItems.push(item);
        }
      }
      setFilteredData(filteredItems);
    };
    fetchFilteredData();
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
