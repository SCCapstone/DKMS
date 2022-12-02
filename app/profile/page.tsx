"use client";

import { collection, query, where, getDocs } from "firebase/firestore";
import { unstable_getServerSession } from "next-auth";
import React, { useState, useEffect } from "react";

import { authOptions } from "../../pages/api/auth/[...nextauth]";
import FeedItem from "../feed/FeedItem";
import db from "../firebase";

import type { DocumentData } from "firebase/firestore";

// TODO SOPHIE FIX THIS (make it a utility function so we can use it in other places)
const getUser = async () => {
  const session = await unstable_getServerSession(authOptions);

  if (!session) {
    throw new Error("No session");
  }

  const { user } = session;
  return user;
};

const Profile = () => {
  const [feedItems, setFeedItems] = useState<DocumentData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const user = await getUser();
      // change to profile's username
      const q = query(
        collection(db, "feed_content"),
        where("username", "==", user.id)
      );
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
