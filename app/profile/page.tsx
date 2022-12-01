"use client";

import db from "../firebase";
import FeedItem from "../feed/FeedItem";
import "../globals.css";
import React, { useState, useEffect } from "react";
import { collection, DocumentData, query, where, getDocs, QuerySnapshot } from "firebase/firestore";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { async } from "@firebase/util";

const Profile = () => {
    const [feedItems, setFeedItems] = useState<DocumentData[]>([]);

    const user = getUser();

    //change to profile's username
    const q = query(collection(db, "feed_content"), where("username", "==", user.id));

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

const getUser = async () => {
    const session = await unstable_getServerSession(authOptions);

    if (!session) {
        throw new Error("No session");
      }

    const user = session.user;
    return user;
}

export default Profile;