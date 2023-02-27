"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { postFeedComment } from "lib/feed";

import type { User } from "next-auth";

const FeedCommentBox = ({
  docId,
  currentUser,
}: {
  docId: string;
  currentUser: User;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  // Create inline loading UI
  const isMutating = isFetching || isPending;

  const [commentText, setCommentText] = useState("");

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    setCommentText("");
    await postFeedComment(docId, currentUser.id, `${commentText}`);
    setIsFetching(false);
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  };

  return (
    <div className="mb-10 object-fill">
      <form>
        <div className="flex flex-row">
          <textarea
            id="chat"
            className="disabled:opacity-75 mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your response"
            rows={1}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={isMutating}
            required
          />
          <button
            onClick={(e) => void handleSubmit(e)}
            disabled={!commentText}
            type="submit"
            className={`${
              isMutating ? "animate-pulse" : ""
            } disabled:opacity-75 inline-flex items-center py-2.5 px-4 text-xs font-medium bg-primary text-center text-white rounded-lg focus:ring-4`}
          >
            Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedCommentBox;
