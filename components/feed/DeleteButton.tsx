"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import deleteFeedItem from "@/lib/feed/deleteFeedItem";
import unsaveFeedItem from "@/lib/savedFeedItems/unsaveFeedItem";

import { TrashSolid } from "../ui/favoriteIcon/icons";

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
      type="button"
      onClick={(e) => void handleDelete(e)}
      disabled={isMutating}
      className={`${isMutating ? "loading" : ""} btn btn-ghost btn-secondary`}
      title="Delete feed item"
    >
      <TrashSolid />
    </button>
  );
};

export default DeleteButton;
