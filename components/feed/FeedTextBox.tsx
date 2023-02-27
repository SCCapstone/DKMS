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
      <div className="w-full mb-4 rounded-lg bg-base-300">
        <div className="rounded-t-lg">
          <textarea
            id="comment"
            className="textarea w-full rounded-none border-none rounded-t-lg"
            placeholder="Write your musical thoughts..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            required
            disabled={isMutating}
          />
        </div>
        <div className="flex items-center justify-between px-3 py-2">
          <button
            onClick={(e) => void handleSubmit(e)}
            disabled={!postText || isMutating}
            type="submit"
            className={`${
              isMutating ? "loading" : ""
            } btn btn-primary btn-wide`}
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
};

export default FeedTextBox;
