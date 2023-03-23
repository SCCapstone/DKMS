"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { saveFeedItem, unsaveFeedItem } from "@/lib/savedFeedItems";

const SaveFeedItemButton = ({
  userId,
  postId,
  savedItemIds,
}: {
  userId: string;
  postId: string;
  savedItemIds?: string[];
}) => {
  const saved = savedItemIds?.includes(postId.trim()) ?? false;

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  // Create inline loading UI
  const isMutating = isFetching || isPending;

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    if (saved) {
      await unsaveFeedItem(userId, postId);
    } else {
      await saveFeedItem(userId, postId);
    }
    setIsFetching(false);
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  };

  return (
    <button
      className={`btn btn-ghost ${isMutating ? "loading" : ""}`}
      type="button"
      onClick={(e) => void handleClick(e)}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className={saved ? "fill-white" : "fill-base-100"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default SaveFeedItemButton;
