"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import getDevices from "@/lib/music/getDevices";
import startPlaying from "@/lib/music/startPlaying";

const PlayTrack = ({ uri, isActive }: { uri: string; isActive: boolean }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  // Create inline loading UI
  const isMutating = isFetching || isPending;

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    if (isActive) {
      await startPlaying(uri);
    }
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

export default PlayTrack;
