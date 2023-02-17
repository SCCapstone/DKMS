"use client";

import { getServerSession } from "next-auth";
import { useState } from "react";

import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { postFeedContent } from "../../pages/api/feedContent/[id]";

import FeedItem from "./FeedItem";

export type FeedItemContent = {
  id: string;
  data: { username: string; content: string };
};

// TODO SOPHIE FIX THIS (make it a utility function so we can use it in other places)
export async function getUser() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("No session");
  }
  return session.user.id;
}

const FeedPage = ({
  data,
  showLinks,
}: {
  data: FeedItemContent[];
  showLinks?: boolean;
}) => {
  const user = getUser();
  const [postText, setPostText] = useState("");

  const post = () => postFeedContent(user, `${postText}`);

  async function handleSubmit() {
    await post();
    window.location.reload();
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
            username={feedItem.data.username}
            feedContent={feedItem.data.content}
            showLink={showLinks}
          />
        ))}
      </ul>
    </div>
  );
};

export default FeedPage;
