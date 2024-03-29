"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import postFeedItem from "@/lib/feed/postFeedItem";

import type { User } from "next-auth";

const MAX_POST_LENGTH = 280;

/* Feed text box to create a new post */
const FeedTextBox = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  // Create inline loading UI
  const isMutating = isFetching || isPending;

  const [postText, setPostText] = useState("");

  /* Post new post */
  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    await postFeedItem(user, postText);
    setIsFetching(false);
    startTransition(() => {
      setPostText("");
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  };

  const remainingChars = MAX_POST_LENGTH - postText.length;

  return (
    <form>
      <div className="w-full mb-4 rounded-lg bg-base-300">
        <div className="rounded-t-lg">
          <textarea
            id="comment"
            className="textarea w-full rounded-none input-bordered rounded-t-lg"
            placeholder="Write your musical thoughts..."
            value={postText}
            maxLength={MAX_POST_LENGTH}
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
            } btn btn-primary btn-outline btn-wide`}
          >
            Post
          </button>
          <div className="text-sm">
            {remainingChars}/{MAX_POST_LENGTH}
          </div>
        </div>
      </div>
    </form>
  );
};

export default FeedTextBox;
