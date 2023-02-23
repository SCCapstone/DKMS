"use client";

import { useState } from "react";

import { postFeedComment } from "pages/api/feedContent/[id]";

import type { User } from "next-auth";

const FeedCommentBox = ({
  docId,
  currentUser,
}: {
  docId: string;
  currentUser: User;
}) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = async () => {
    await postFeedComment(docId, currentUser.id, `${commentText}`);
    window.location.reload();
  };

  return (
    <div className="mb-10 object-fill">
      <form>
        <div className="flex flex-row">
          <textarea
            id="chat"
            className="mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your response"
            rows={1}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          />
          <button
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={() => handleSubmit()}
            disabled={!commentText}
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium bg-primary text-center text-white rounded-lg focus:ring-4 "
          >
            Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedCommentBox;
