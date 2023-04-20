"use client";

import { useState } from "react";

import { usePlayer } from "@/components/Player/PlayerContext";
import startPlaying from "@/lib/music/startPlaying";

import PlayIcon from "./PlayIcon";

import type { StartPlayingContextParams } from "@/lib/music/startPlaying";

type PlayButtonProps = {
  small?: boolean;
} & StartPlayingContextParams;
const PlayButton = (props: PlayButtonProps) => {
  const { small, ...params } = props;
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
      className={`btn btn-ghost btn-square ${isFetching ? "loading" : ""}`}
      onClick={(e) => void handleClick(e)}
      type="button"
      disabled={isFetching}
      title="Play"
    >
      <PlayIcon small={small} />
    </button>
  );
};

export default PlayButton;
