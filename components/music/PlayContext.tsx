"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import startPlayingContext from "@/lib/music/startPlayingContext";

import PlayIcon from "./PlayIcon";

const PlayContext = ({ uri }: { uri: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  // Create inline loading UI
  const isMutating = isFetching || isPending;

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    try {
      await startPlayingContext(uri);
    } catch (error) {
      // Button will not do anything if there is no active device
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
      onClick={(e) => void handleClick(e)}
      type="button"
      disabled={isMutating}
      title="Play"
    >
      <PlayIcon />
    </button>
  );
};

export default PlayContext;
