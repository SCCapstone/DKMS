"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const ShareTrackIcon = ({ track }: { track: SpotifyApi.TrackObjectFull }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  // Create inline loading UI
  const isMutating = isFetching || isPending;
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsFetching(true);
    // postFeedItem(track) somehow
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
      onClick={(e) => handleClick(e)}
      type="button"
      disabled={isMutating}
    >
      TEXT
    </button>
  );
};

export default ShareTrackIcon;
