"use client";

import { useState } from "react";

import { postFeedContent } from "../../pages/api/feedContent/[id]";
import { getUser } from "../../utils/getUser";

import FeedItem from "./FeedItem";

import type { User } from "next-auth";

export type FeedComment = {
  id: string;
  username: string;
  comment: string;
};

export type FeedItemContent = {
  id: string;
  data: {
    username: string;
    content: string;
    comments: FeedComment[];
  };
};

const FeedPage = ({
  data,
  showLinks,
}: {
  data: FeedItemContent[];
  showLinks?: boolean;
}) => {
  const [postText, setPostText] = useState("");

  async function post() {
    const user: User = await getUser();
    void postFeedContent(user.name, `${postText}`);
  }

  async function handleSubmit() {
    await post();
  }

  return (
    <div>
      <form>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <textarea
              id="comment"
              className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Write your musical thoughts..."
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={() => handleSubmit()}
              disabled={!postText}
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium bg-primary text-center text-white rounded-lg focus:ring-4 "
            >
              Post
            </button>
          </div>
        </div>
      </form>
      <div className="divider" />
      <ul>
        {data.map((feedItem) => (
          <FeedItem
            key={feedItem.id}
            docId={feedItem.id}
            username={feedItem.data.username}
            feedContent={feedItem.data.content}
            showLink={showLinks}
            comments={feedItem.data.comments}
          />
        ))}
      </ul>
    </div>
  );
};

export default FeedPage;
