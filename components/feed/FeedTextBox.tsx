"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { postFeedContent } from "lib/feed";

const FeedTextBox = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  // Create inline loading UI
  const isMutating = isFetching || isPending;

  const [postText, setPostText] = useState("");

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    setPostText("");
    await postFeedContent(userId, `${postText}`);
    setIsFetching(false);
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  };

  return (
    <form>
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <textarea
            id="comment"
            className="disabled:opacity-75 w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write your musical thoughts..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            required
            disabled={isMutating}
          />
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <button
            onClick={(e) => void handleSubmit(e)}
            disabled={!postText || isMutating}
            type="submit"
            className={`${
              isMutating ? "animate-pulse" : ""
            } disabled:opacity-75 inline-flex items-center py-2.5 px-4 text-xs font-medium bg-primary text-center text-white rounded-lg focus:ring-4`}
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
};

export default FeedTextBox;
