"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { usePlayer } from "@/components/Player/PlayerContext";
import startPlaying from "@/lib/music/startPlaying";

import PlayIcon from "./PlayIcon";

import type { StartPlayingContextParams } from "@/lib/music/startPlaying";

const PlayButton = (params: StartPlayingContextParams) => {
  const router = useRouter();
  const {
    currentDeviceState: [currentDeviceId],
  } = usePlayer();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  // Create inline loading UI
  const isMutating = isFetching || isPending;

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    await startPlaying({
      ...params,
      deviceId: currentDeviceId,
    });

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

export default PlayButton;
