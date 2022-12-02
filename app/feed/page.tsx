"use client";

import { onSnapshot, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import db from "../firebase";

import FeedItem from "./FeedItem";

import type { DocumentData } from "firebase/firestore";

const Feed = () => {
  const [feedItems, setFeedItems] = useState<DocumentData[]>([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "feed_content"), (snapshot) =>
        setFeedItems(snapshot.docs.map((doc) => doc.data()))
      ),
    []
  );

  return (
    <div>
      <h1 className="normal-case font-bold">Feed</h1>
      <div className="divider" />
      <ul>
        {feedItems.map((feedItem) => (
          // SOPHIE FIX THIS
          <FeedItem
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            username={feedItem.username}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            feedContent={feedItem.content}
          />
        ))}
      </ul>
    </div>
  );
};

export default Feed;
