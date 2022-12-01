"use client";

import db from "../firebase";
import React, { useEffect, useState }from "react";
import FeedItem from "./FeedItem";
import { onSnapshot, collection, DocumentData } from "firebase/firestore";

const Feed = () => {
    const [usernames, setUsernames] : DocumentData[] = useState([]);

    console.log(usernames);
    useEffect(() => onSnapshot(collection(db, "feed_content"),(snapshot) =>
            setUsernames(snapshot.docs.map((doc) => doc.data()))
            ), 
        []
    );

    return (
        <div>
            <h1 className="normal-case font-bold">Feed</h1>
            <div className="divider"></div>
            <ul>
                {usernames.map((username) => (
                    <FeedItem username = {username.username} feedContent = {username.content} />
                ))}
            </ul>
        </div>
    )
};

export default Feed;