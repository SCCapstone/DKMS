"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import toggleFavorite from "@/lib/favoriteTracks/toggleFavorite";

import { HeartRegular, HeartSolid } from "./icons";

const FavoriteIcon = ({
  isFavorited,
  trackId,
}: {
  isFavorited: boolean;
  trackId: string;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  // Create inline loading UI
  const isMutating = isFetching || isPending;
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsFetching(true);
    await toggleFavorite(trackId, isFavorited);
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
      onClick={(e) => void handleClick(e)}
      type="button"
      disabled={isMutating}
      title="Favorite song on Spotify"
    >
      {isFavorited ? <HeartSolid /> : <HeartRegular />}
    </button>
  );
};

export default FavoriteIcon;
