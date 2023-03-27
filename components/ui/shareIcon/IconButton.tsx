"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import postFeedItem from "@/lib/feed/postFeedItem";

import Share from "./icon";

import type { User } from "next-auth";

const IconButton = ({
  user,
  trackId,
  playlistId,
  artistId,
  albumId,
}: {
  user: User;
  trackId?: string;
  playlistId?: string;
  artistId?: string;
  albumId?: string;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  // Create inline loading UI
  const isMutating = isFetching || isPending;
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsFetching(true);
    await postFeedItem(user, "", trackId, playlistId, artistId, albumId);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <button
      className={`btn btn-ghost ${isMutating ? "loading" : ""}`}
      onClick={(e) => void handleClick(e)}
      type="button"
      disabled={isMutating}
      title="Share to feed"
    >
      <Share />
    </button>
  );
};

export default IconButton;
