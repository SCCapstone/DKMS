"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

const Player = ({ accessToken }: { accessToken: string }) => {
  const [isVisible, toggleVisibility] = useState(false);
  const router = useRouter();
  if (!isVisible) {
    return (
      <button
        className="btn btn-ghost bg-spotify text-white btn-block"
        onClick={() => toggleVisibility(true)}
        type="button"
      >
        Connect to Spotify
      </button>
    );
  }
  return (
    <>
      {/* @see https://github.com/gilbarbara/react-spotify-web-playback/issues/154 */}
      {/* @ts-expect-error SpotifyPlayer type error */}
      <SpotifyPlayer
        updateSavedStatus={() => router.refresh()}
        syncExternalDevice
        syncExternalDeviceInterval={5}
        name="DKMS"
        token={accessToken}
        layout="compact"
        showSaveIcon
        persistDeviceSelection
        hideAttribution
      />
    </>
  );
};

export default Player;
