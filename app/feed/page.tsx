'use client';

import styles from "./page.module.css";
import React from "react";
import FeedItem from "./FeedItem";

const Feed = () => {
    return (
        <div>
            <h1 className="normal-case font-bold">Feed</h1>
            <div className="divider"></div>
            <FeedItem />
        </div>
    )
};

export default Feed;