import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";

type PlaybackBarProps = {
  accessToken: string;
};

const spotifyApi = new SpotifyWebApi();

const PlaybackBar = ({ accessToken }: PlaybackBarProps) => {
  const [playerState, setPlayerState] =
    useState<SpotifyApi.CurrentPlaybackResponse | null>(null);

  useEffect(() => {
    spotifyApi.setAccessToken(accessToken);

    spotifyApi
      .getMyCurrentPlaybackState()
      .then(
        (
          res: React.SetStateAction<SpotifyApi.CurrentPlaybackResponse | null>
        ) => {
          setPlayerState(res);
        }
      )
      .catch((err: any) => {
        console.error(err);
      });
  }, [accessToken]);

  const handlePlayPause = () => {
    if (playerState?.is_playing) {
      spotifyApi
        .pause()
        .then(() => console.log("Playback paused"))
        .catch((error: any) => console.log("Error pausing playback:", error));
    } else {
      spotifyApi
        .play()
        .then(() => {
          console.log("Playback started.");
        })
        .catch((error: any) => {
          console.error("Failed to start playback:", error);
        });
    }
  };

  /* const handleSkipPrevious = () => {
    spotifyApi.skipToPrevious();
  };

  const handleSkipNext = () => {
    spotifyApi.skipToNext();
  }; */

  return (
    <div
      style={{
        backgroundColor: "#111",
        position: "fixed",
        bottom: 0,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80px",
        borderTop: "1px solid #333",
        color: "#fff",
        zIndex: 9999,
      }}
    >
      <button type="button" onClick={handlePlayPause}>
        {playerState?.is_playing ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default PlaybackBar;

/* return (
    <div>
      <button type="button" onClick={handleSkipPrevious}>
        Skip Previous
      </button>
      <button type="button" onClick={handlePlayPause}>
        {playerState?.is_playing ? "Pause" : "Play"}
      </button>
       <button type="button" onClick={handleSkipNext}>
        Skip Next
      </button> 
    </div>
  );
}; */
