"use client";

import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";

import FeedItem from "../feed/FeedItem";
import db from "../firebase";

import type { DocumentData } from "firebase/firestore";

const Profile = () => {
  const [feedItems, setFeedItems] = useState<DocumentData[]>([]);

  // change to profile's username
  const q = query(
    collection(db, "feed_content"),
    where("username", "==", "sophiecra")
  );

  useEffect(() => {
    async function fetchData() {
      const qSnapshot = await getDocs(q);
      setFeedItems(qSnapshot.docs.map((doc) => doc.data()));
    }
    void fetchData();
  }, []);

  return (
    <div>
      <h1 className="normal-case font-bold">Profile</h1>
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

export default Profile;
