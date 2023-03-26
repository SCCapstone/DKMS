"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import getCurrentTrackUri from "@/lib/playback/gettrackrui";

import play from "../../../../lib/playback/play";
import next from "../../../../lib/playback/skipnext";
import prev from "../../../../lib/playback/skipprev";
import BasePanel from "../BasePanel";

let currentIsTrackPlaying = false;

const Playback = ({
  isTrackPlaying,
  uri,
}: {
  isTrackPlaying: boolean;
  uri: string;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // new state variable for player state

  const handlePrevClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    await prev(uri, isTrackPlaying, true);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };
  const handleNextClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    await next(uri, isTrackPlaying, true);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    // TODO unsafe access on any value
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const tmp_uri = await getCurrentTrackUri();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    currentIsTrackPlaying = await play(tmp_uri.item.uri, currentIsTrackPlaying);
    setIsPlaying(!isPlaying); // toggle player state
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
    return currentIsTrackPlaying;
  };

  // Determine which icon to show based on the current state of the track
  const playPauseIcon = isPlaying ? ( // use isPlaying state variable instead of isTrackPlaying
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      className="stroke-current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 7h3v10H8zm5 0h3v10h-3z" />
    </svg>
  ) : (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      className="stroke-current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M10 8l6 4-6 4V8z" />
    </svg>
  );

  return (
    <BasePanel title="Playback" sidebarId="playback">
      <div className="flex justify-center items-center">
        <div className="flex space-x-4">
          <button
            type="button"
            className="focus:outline-none"
            onClick={(e) => void handlePrevClick(e)}
          >
            <svg
              width="35"
              height="35"
              viewBox="0 0 24 24"
              fill="none"
              className="stroke-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 6L4 12L11 18V6Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="focus:outline-none"
            onClick={(e) => void handleClick(e)}
          >
            {playPauseIcon}
          </button>
          <button
            type="button"
            className="focus:outline-none"
            onClick={(e) => void handleNextClick(e)}
          >
            <svg
              width="35"
              height="35"
              viewBox="0 0 24 24"
              fill="none"
              className="stroke-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 6L20 12L13 18V6Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </BasePanel>
  );
};

export default Playback;
