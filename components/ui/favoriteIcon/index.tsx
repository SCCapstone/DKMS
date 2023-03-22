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

  const [localFavorited, setLocalFavorited] = useState(isFavorited);

  // Create inline loading UI
  const isMutating = isFetching || isPending;
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsFetching(true);
    await toggleFavorite(trackId, localFavorited);
    setLocalFavorited(!localFavorited);
    setIsFetching(false);
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  };

  return (
    <button
      className="p-1 bg-red-200 text-red-400 stroke-red-800 fill-red-900"
      onClick={(e) => void handleClick(e)}
      type="button"
      disabled={isMutating}
    >
      {localFavorited ? <HeartSolid /> : <HeartRegular />}
    </button>
  );
};

export default FavoriteIcon;
