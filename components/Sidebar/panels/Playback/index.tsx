"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, useEffect } from "react";

import { play, skipNext, skipPrev } from "@/lib/playback";
import getCurrentTrackUri from "@/lib/playback/getCurrentTrackUri";
import getTrackName from "@/lib/playback/gettrackname";

import BasePanel from "../BasePanel";

const Playback = ({
  isTrackPlaying,
  uri,
}: {
  isTrackPlaying: boolean;
  uri: string;
}) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [, setIsFetching] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // new state variable for player state
  const [, setTrackName] = useState<string | null>(null); // new state variable for track name

  useEffect(() => {
    const fetchTrackName = async () => {
      const name = await getTrackName();
      setTrackName(name);
    };
    void fetchTrackName();
  }, []); // run only once on mount
  const handlePrevClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    await skipPrev(uri, isTrackPlaying, true);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };
  const handleNextClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    await skipNext(uri, isTrackPlaying, true);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };

  const handlePlayPauseClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const currentTrackUri = await getCurrentTrackUri();
    if (!currentTrackUri && !isPlaying) {
      setIsFetching(false);
      return;
    }
    const isTrackPlayingNow = await play(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      currentTrackUri?.item?.uri,
      isPlaying,
      isPlaying
    );
    setIsPlaying(isTrackPlayingNow);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
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
        {/* {trackName && <div className="text-center">{trackName}</div>} */}
        <div className="flex space-x-4">
          <button
            type="button"
            className="btn btn-square btn-ghost"
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
            className="btn btn-square btn-ghost"
            onClick={(e) => void handlePlayPauseClick(e)}
          >
            {playPauseIcon}
          </button>
          <button
            type="button"
            className="btn btn-square btn-ghost"
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
