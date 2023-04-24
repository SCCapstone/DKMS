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
        <div>
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
          <div className="pt-4">
            <div className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
              <input type="checkbox" />
              <div className="align-center collapse-title text-xs font-bold">
                Setup Instructions
              </div>
              <div className="collapse-content text-xs">
                <ol>
                  <li>
                    1. Open Spotify on your browser or another device on your
                    network
                  </li>
                  <li>2. Select &apos;DKMS&apos; as your device</li>
                  <li>
                    3. Select a song within the DKMS application and hit play to
                    start listening!
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
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
