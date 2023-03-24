"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import addToQueue from "@/lib/music/addToQueue";
import getArtistTracks from "@/lib/music/getArtistTracks";
import startPlaying from "@/lib/music/startPlaying";

const PlayArtist = ({
  isArtistPlaying,
  uri,
}: {
  isArtistPlaying: boolean;
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
    await getArtistTracks(uri);
    await addToQueue(uri);
    await startPlaying(uri, isArtistPlaying);
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
          fill={isArtistPlaying ? "black" : "#1ED760"}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-disabled={isMutating}
        >
          <path
            d="M3 5.49686C3 3.17662 5.52116 1.73465 7.52106 2.91106L18.5764 9.41423C20.5484 10.5742 20.5484 13.4259 18.5764 14.5858L7.52106 21.089C5.52116 22.2654 3 20.8234 3 18.5032V5.49686Z"
            stroke={isArtistPlaying ? "black" : "#1ED760"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default PlayArtist;
