"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import startPlayingContextTrack from "@/lib/music/startPlayingContextTrack";

const PlayContextTrack = ({
  contextUri,
  trackUri,
}: {
  contextUri: string;
  trackUri: string;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  // Create inline loading UI
  const isMutating = isFetching || isPending;

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    await startPlayingContextTrack(contextUri, trackUri);
    setIsFetching(false);
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  };

  return (
    <div className="flex flex-row">
      <button
        className="btn btn-primary btn-outline w-full"
        onClick={(e) => void handleClick(e)}
        type="button"
        disabled={isMutating}
      >
        Play
      </button>
    </div>
  );
};

export default PlayContextTrack;
