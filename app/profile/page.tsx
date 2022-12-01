"use client";

import db from "../firebase";
import FeedItem from "../feed/FeedItem";
import "../globals.css";
import React, { useState, useEffect } from "react";
import { onSnapshot, collection, DocumentData, query, where, getDocs, QuerySnapshot } from "firebase/firestore";

const Profile = () => {
    const [feedItems, setFeedItems] = useState<DocumentData[]>([]);

    //change to profile's username
    const q = query(collection(db, "feed_content"), where("username", "==", "sophiecra"));

    useEffect(() => {
        async function fetchData() {
            const qSnapshot = await getDocs(q);
            setFeedItems(qSnapshot.docs.map((doc) => doc.data()));
        }
        fetchData();
    }, []);

    return <div>
        <h1 className="normal-case font-bold">Profile</h1>
        <div className="divider"></div>
        <ul>
            {feedItems.map((feedItem) => (
                <FeedItem username = {feedItem.username} feedContent = {feedItem.content} />
            ))}
        </ul>
    </div>
}

export default Profile;