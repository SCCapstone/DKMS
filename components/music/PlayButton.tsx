"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import startPlaying from "@/lib/music/startPlaying";

import PlayIcon from "./PlayIcon";
import PlayRect from "./PlayRect";

import type { StartPlayingContextParams } from "@/lib/music/startPlaying";

const PlayButton = ({
  uris,
  contextUri,
  offset,
  type,
}: StartPlayingContextParams) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  // Create inline loading UI
  const isMutating = isFetching || isPending;

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    if (offset) {
      await startPlaying({ contextUri, offset, type });
    } else if (uris && contextUri) {
      await startPlaying({ uris, contextUri, type });
    } else if (contextUri) {
      await startPlaying({ contextUri, type });
    } else if (uris) {
      await startPlaying({ uris, type });
    }
    /*
    try {
      if (offset) {
        await startPlaying({ contextUri, offset });
      } else if (uris && contextUri) {
        await startPlaying({ uris, contextUri });
      } else if (contextUri) {
        await startPlaying({ contextUri });
      } else if (uris) {
        await startPlaying({ uris });
      }
    } catch (error) {
      //   Button will not do anything if there is no active device
    }
    */

    setIsFetching(false);
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  };

  const buttonContent = type === "icon" ? <PlayIcon /> : <PlayRect />;

  return (
    <button
      className={`btn btn-ghost ${isMutating ? "loading" : ""}`}
      onClick={(e) => void handleClick(e)}
      type="button"
      disabled={isMutating}
      title="Play"
    >
      {buttonContent}
    </button>
  );
};

export default PlayButton;
