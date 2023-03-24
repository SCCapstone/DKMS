"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import startPlaying from "@/lib/music/startPlaying";

const PlayTrack = ({
  isTrackPlaying,
  uri,
}: {
  isTrackPlaying: boolean;
  uri: string;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  // Create inline loading UI
  const isMutating = isFetching || isPending;

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    await startPlaying(uri, isTrackPlaying);
    setIsFetching(false);
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  };

  return (
    <div className="flex flex-row">
      <button type="button" onClick={(e) => void handleClick(e)}>
        <svg
          fill={isTrackPlaying ? "black" : "#1ED760"}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-disabled={isMutating}
        >
          <path
            d="M3 5.49686C3 3.17662 5.52116 1.73465 7.52106 2.91106L18.5764 9.41423C20.5484 10.5742 20.5484 13.4259 18.5764 14.5858L7.52106 21.089C5.52116 22.2654 3 20.8234 3 18.5032V5.49686Z"
            stroke={isTrackPlaying ? "black" : "#1ED760"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default PlayTrack;

/* "use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import getDevices from "@/lib/music/getDevices";

const PlayButton = ({ filled = false }: { filled?: boolean }) => {
  const [state, setState] = useState(filled);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("play change");
  }, [state]);

  const onClick = () => {
    if (!state) {
      setState(true);
    } else {
      setState(false);
    }
  };

  if (state) {
    return (
      <svg
        onClick={onClick}
        fill="black"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 5.49686C3 3.17662 5.52116 1.73465 7.52106 2.91106L18.5764 9.41423C20.5484 10.5742 20.5484 13.4259 18.5764 14.5858L7.52106 21.089C5.52116 22.2654 3 20.8234 3 18.5032V5.49686Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg
      onClick={onClick}
      fill="#1ED760"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 5.49686C3 3.17662 5.52116 1.73465 7.52106 2.91106L18.5764 9.41423C20.5484 10.5742 20.5484 13.4259 18.5764 14.5858L7.52106 21.089C5.52116 22.2654 3 20.8234 3 18.5032V5.49686Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlayButton;
*/
