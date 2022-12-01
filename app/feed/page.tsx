"use client";

import { onSnapshot, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import db from "../firebase";

import FeedItem from "./FeedItem";

import type { DocumentData } from "firebase/firestore";

const Feed = () => {
  const [usernames, setUsernames] = useState<DocumentData[]>([]);

  console.log(usernames);
  useEffect(
    () =>
      onSnapshot(collection(db, "feed_content"), (snapshot) =>
        setUsernames(snapshot.docs.map((doc) => doc.data()))
      ),
    []
  );

  return (
    <div>
      <h1 className="normal-case font-bold">Feed</h1>
      <div className="divider" />
      <ul>
        {usernames.map((username) => (
          // TODO FIX THIS SOPHIE
          <FeedItem
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            username={username.username}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            feedContent={username.content}
          />
        ))}
      </ul>
    </div>
  );
};

export default Feed;
