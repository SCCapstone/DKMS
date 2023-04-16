"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

import { usePlayer } from "@/components/Player/PlayerContext";

const Player = ({ accessToken }: { accessToken: string }) => {
  const { currentDeviceState } = usePlayer();
  const [isVisible, setIsVisible] = useState(false);
  const [, setCurrentDeviceId] = currentDeviceState;

  const router = useRouter();
  if (!isVisible) {
    return (
      <button
        className="btn btn-ghost bg-spotify text-white btn-block"
        onClick={() => setIsVisible(true)}
        type="button"
      >
        Connect to Spotify
      </button>
    );
  }
  return (
    <SpotifyPlayer
      updateSavedStatus={() => router.refresh()}
      syncExternalDevice
      syncExternalDeviceInterval={5}
      callback={(state) => {
        if (state.status === "READY") {
          setCurrentDeviceId(state.currentDeviceId);
        }
      }}
      name="DKMS"
      token={accessToken}
      layout="compact"
      showSaveIcon
      persistDeviceSelection
      uris={[]}
      hideAttribution
    />
  );
};

export default Player;
