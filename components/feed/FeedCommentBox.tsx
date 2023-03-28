"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import postFeedComment from "@/lib/feed/postFeedComment";

import type { User } from "next-auth";

const FeedCommentBox = ({
  postId,
  currentUser,
}: {
  postId: string;
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
    await postFeedComment(postId, currentUser, commentText);
    setIsFetching(false);
    startTransition(() => {
      setCommentText("");
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
            className={`${
              isMutating ? "loading" : ""
            } btn btn-outline btn-primary`}
          >
            Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedCommentBox;
