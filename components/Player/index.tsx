"use client";

import { useRouter } from "next/navigation";
import SpotifyPlayer from "react-spotify-web-playback";

import { usePlayer } from "@/components/Player/PlayerContext";

const Player = ({ accessToken }: { accessToken: string }) => {
  const { currentDeviceState, visibleState } = usePlayer();
  const [isVisible, setIsVisible] = visibleState;
  const [, setCurrentDeviceId] = currentDeviceState;

  const router = useRouter();

  return (
    <>
      <div className="hidden">
        <SpotifyPlayer
          callback={(state) => {
            if (state.status === "READY") {
              setIsVisible(true);
              setCurrentDeviceId(state.currentDeviceId);
            }
          }}
          name="DKMS"
          token={accessToken}
          persistDeviceSelection
          uris={[]}
        />
        <br />
      </div>
      {isVisible ? (
        <SpotifyPlayer
          updateSavedStatus={() => router.refresh()}
          syncExternalDevice
          syncExternalDeviceInterval={2}
          callback={(state) => {
            setCurrentDeviceId(state.currentDeviceId);
          }}
          name="DKMS"
          token={accessToken}
          layout="compact"
          showSaveIcon
          persistDeviceSelection
          uris={[]}
          hideAttribution
        />
      ) : (
        <button
          className="btn btn-ghost bg-spotify text-white btn-block"
          onClick={() => setIsVisible(true)}
          type="button"
        >
          Connect to Spotify
        </button>
      )}
    </>
  );
};

export default Player;
