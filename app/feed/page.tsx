"use client";

import db from "../firebase";
import React, { useEffect, useState }from "react";
import FeedItem from "./FeedItem";
import { onSnapshot, collection, DocumentData } from "firebase/firestore";

const Feed = () => {
    const [feedItems, setFeedItems] = useState<DocumentData[]>([]);

    useEffect(() => onSnapshot(collection(db, "feed_content"),(snapshot) =>
            setFeedItems(snapshot.docs.map((doc) => doc.data()))
            ), 
        []
    );

    return (
        <div>
            <h1 className="normal-case font-bold">Feed</h1>
            <div className="divider"></div>
            <ul>
                {feedItems.map((feedItem) => (
                    <FeedItem username = {feedItem.username} feedContent = {feedItem.content} />
                ))}
            </ul>
        </div>
    )
};

export default Feed;