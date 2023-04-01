"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, useEffect } from "react";

import { skipNext, skipPrev, resume, pause } from "@/lib/playback";
import getCurrentTrackUri from "@/lib/playback/getCurrentTrackUri";
import getTrackName from "@/lib/playback/getTrackName";

import BasePanel from "../BasePanel";

type SpotifyTrack = {
  duration_ms: number;
};
const PlaybackView = ({
  isTrackPlaying,
  uri,
  isPremiumUser,
}: {
  isTrackPlaying: boolean;
  uri: string;
  isPremiumUser: boolean;
}) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [, setIsFetching] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackName, setTrackName] = useState<string | null>(null);
  const [artistName, setArtistName] = useState<string | null>(null);
  const [playbackProgress, setPlaybackProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    const fetchTrackName = async (): Promise<void> => {
      const { trackName: fetchedTrackName, artistName: fetchedArtistName } =
        await getTrackName();
      setTrackName(fetchedTrackName);
      setArtistName(fetchedArtistName);
    };
    void fetchTrackName();

    const intervalId = setInterval(() => {
      void fetchTrackName();
    }, 1000); // fetch track name every 1 second

    return () => clearInterval(intervalId); // cleanup function to clear the interval when the component unmounts
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      try {
        getCurrentTrackUri()
          .then(
            ({
              progress_ms,
              item,
            }: {
              progress_ms: number;
              item: SpotifyTrack;
            }) => {
              setPlaybackProgress(progress_ms / 1000);
              setDuration(item.duration_ms / 1000);
            }
          )
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handlePrevClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    await skipPrev(uri, isTrackPlaying, true);
    setIsFetching(false);
    if (!isPremiumUser) {
      console.error("Error: Premium subscription required.");
      return;
    }
    startTransition(() => {
      router.refresh();
    });
  };
  const handleNextClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    await skipNext(uri, isTrackPlaying, true);
    setIsFetching(false);
    if (!isPremiumUser) {
      console.error("Error: Premium subscription required.");
      return;
    }
    startTransition(() => {
      router.refresh();
    });
  };

  const handlePlayPauseClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);

    const currentTrackUri = (await getCurrentTrackUri()) as {
      is_playing: unknown;
      uri: string;
    };

    if (isPlaying) {
      await pause(true, false);
      setIsPlaying(false);
    } else if (currentTrackUri.is_playing) {
      await pause(true, true);
      setIsPlaying(false);
    } else {
      await resume();
      setIsPlaying(true);
    }

    setIsFetching(false);

    if (!isPremiumUser) {
      console.error("Error: Premium subscription required.");
      return;
    }

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
      <div> </div>
      <div className="flex flex-col justify-center items-center">
        {trackName && (
          <a
            href={`spotify:track:${uri}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center mb-2 font-bold"
          >
            {trackName}
          </a>
        )}
        {artistName && (
          <p className="text-center text-sm font-bold">{artistName}</p>
        )}
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
        <div className="text-center mt-2">
          {`${Math.floor(playbackProgress / 60)
            .toString()
            .padStart(2, "0")}:${Math.floor(playbackProgress % 60)
            .toString()
            .padStart(2, "0")} / ${Math.floor(duration / 60)
            .toString()
            .padStart(2, "0")}:${Math.floor(duration % 60)
            .toString()
            .padStart(2, "0")}`}
        </div>
      </div>
    </BasePanel>
  );
};

export default PlaybackView;
