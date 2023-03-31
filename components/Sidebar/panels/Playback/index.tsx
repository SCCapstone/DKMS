/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, useEffect } from "react";

import { skipNext, skipPrev, resume, pause } from "@/lib/playback";
import getAvailableDevices from "@/lib/playback/getAvaliableDevices";
import getCurrentTrackUri from "@/lib/playback/getCurrentTrackUri";
import getTrackName from "@/lib/playback/getTrackName";
import setActiveDevice from "@/lib/playback/setActiveDevice";
import transferPlayback from "@/lib/playback/transferPlayback";

import BasePanel from "../BasePanel";

type Device = {
  id: string;
  name: string;
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
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState("");

  useEffect(() => {
    const fetchDevices = async () => {
      const devices = await getAvailableDevices();
      setDevices(devices);
      setSelectedDevice(devices.length > 0 ? devices[0].id : "");
    };
    void fetchDevices();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const intervalId = setInterval(async () => {
      const devices = await getAvailableDevices();
      setDevices(devices);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchTrackName = async () => {
      const { trackName, artistName } = await getTrackName();
      setTrackName(trackName);
      setArtistName(artistName);
    };
    void fetchTrackName();

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const intervalId = setInterval(fetchTrackName, 1000); // fetch track name every 1 seconds

    return () => clearInterval(intervalId); // cleanup function to clear the interval when the component unmounts
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const intervalId = setInterval(async () => {
      try {
        const { progress_ms, item } = await getCurrentTrackUri();
        setPlaybackProgress(progress_ms / 1000);
        setDuration(item.duration_ms / 1000);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleDeviceSelection = async (deviceId: string) => {
    setSelectedDevice(deviceId);
    await setActiveDevice(deviceId);

    const currentTrackUri = await getCurrentTrackUri();
    if (!currentTrackUri) {
      return;
    }

    const { is_playing } = currentTrackUri;

    if (is_playing) {
      const isTrackPlaying = true; // Assuming this is defined elsewhere
      await pause(isTrackPlaying, true);
      await transferPlayback(deviceId);
      await resume();
    } else {
      await transferPlayback(deviceId);
    }
  };

  const handlePrevClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    await skipPrev(uri, isTrackPlaying, true);
    setIsFetching(false);
    if (!isPremiumUser) {
      // eslint-disable-next-line no-console
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
      // eslint-disable-next-line no-console
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

    const currentTrackUri = await getCurrentTrackUri();
    if (!currentTrackUri) {
      setIsFetching(false);
      return;
    }

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
      // eslint-disable-next-line no-console
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
        <div>
          <select
            value={selectedDevice}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onChange={(e) => handleDeviceSelection(e.target.value)}
          >
            {devices.map((device) => (
              <option key={device.id} value={device.id}>
                {device.name}
              </option>
            ))}
          </select>
        </div>
        {/* <div
          className="my-4 subtitle"
          style={{ textAlign: "center", marginTop: "1em" }}
        >
          Play song on Spotify to initiate playback
        </div> */}
      </div>
    </BasePanel>
  );
};

export default PlaybackView;
