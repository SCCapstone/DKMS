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
    <div className="mb-10">
      <form>
        <div className="flex flex-row gap-4">
          <textarea
            id="chat"
            className="textarea w-full textarea-bordered"
            placeholder="Your response"
            rows={1}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={isMutating}
            required
          />
          <button
            onClick={(e) => void handleSubmit(e)}
            disabled={!commentText || isMutating}
            type="submit"
            className={`${isMutating ? "loading" : ""} btn btn-primary`}
          >
            Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedCommentBox;