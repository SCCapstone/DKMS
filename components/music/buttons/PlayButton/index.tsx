"use client";

import { useState } from "react";

import { usePlayer } from "@/components/Player/PlayerContext";
import startPlaying from "@/lib/music/startPlaying";

import PlayIcon from "./PlayIcon";

import type { StartPlayingContextParams } from "@/lib/music/startPlaying";

const PlayButton = (params: StartPlayingContextParams) => {
  const {
    currentDeviceState: [currentDeviceId],
  } = usePlayer();
  const [isFetching, setIsFetching] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    await startPlaying({
      ...params,
      deviceId: currentDeviceId,
    });

    setIsFetching(false);
  };

  return (
    <button
      className={`btn btn-ghost btn-sm ${isFetching ? "loading" : ""}`}
      onClick={(e) => void handleClick(e)}
      type="button"
      disabled={isFetching}
      title="Play"
    >
      <PlayIcon />
    </button>
  );
};

export default PlayButton;
