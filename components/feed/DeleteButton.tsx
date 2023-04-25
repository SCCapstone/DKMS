"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import deleteFeedItem from "@/lib/feed/deleteFeedItem";
import unsaveFeedItem from "@/lib/savedFeedItems/unsaveFeedItem";

/* Delete button for feed posts and comments */
const DeleteButton = ({
  userId,
  postId,
  commentId,
}: {
  userId: string;
  postId: string;
  commentId?: string;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const isMutating = isPending || isFetching;

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    await unsaveFeedItem(userId, postId);
    await deleteFeedItem(postId, commentId);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };
  return (
    <button
      id="deleteButton"
      type="button"
      onClick={(e) => void handleDelete(e)}
      disabled={isMutating}
      className={`${isMutating ? "loading" : ""} btn btn-ghost btn-secondary`}
      title="Delete feed item"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        className="fill-current stroke-current"
        width={24}
        height="24"
      >
        <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
      </svg>
    </button>
  );
};

export default DeleteButton;
