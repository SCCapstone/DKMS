import {
  StepBackwardOutlined,
  StepForwardOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

const PlaybackBar = (): JSX.Element => {
  const [trackName, setTrackName] = useState<string>("");
  const [artistName, setArtistName] = useState<string>("");
  const [albumImageUrl, setAlbumImageUrl] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");
    spotifyApi.setAccessToken(accessToken);

    spotifyApi
      .getMyCurrentPlaybackState()
      .then((response) => {
        if (response && response.item) {
          setTrackName(response.item.name);
          setArtistName(response.item.artists[0].name);
          setAlbumImageUrl(response.item.album.images[0].url);
          setIsPlaying(response.is_playing);
          setTrackProgress(response.progress_ms || 0);
        }
      })
      .catch((error) => {
        console.error("Error retrieving current playback state:", error);
      });
  }, []);

  function handleSkipPreviousClick(): void {
    spotifyApi.skipToPrevious()
      .then(() => {
        setTrackProgress(0);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function handleSkipNextClick(): void {
    spotifyApi.skipToNext()
      .then(() => {
        setTrackProgress(0);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  function handlePlayPauseClick(): void {
    if (isPlaying) {
      spotifyApi.pause()
        .then(() => {
          setIsPlaying(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      spotifyApi.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  const backwardClickHandler = () => handleSkipPreviousClick();
  const playPauseClickHandler = () => handlePlayPauseClick();
  const forwardClickHandler = () => handleSkipNextClick();

  function formatMilliseconds(trackProgress: number): React.ReactNode {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <center>
        <img className="album-image" src={albumImageUrl} />
        <div className="track-info">
          <div className="track-name">{trackName}</div>
          <div className="artist-name">{artistName}</div>
        </div>
        <div className="buttons">
          <StepBackwardOutlined
            className="forback"
            onClick={backwardClickHandler}
            style={{ fontSize: "24px" }}
          />
          {isPlaying ? (
            <PauseCircleOutlined
              className="pauseplay"
              onClick={playPauseClickHandler}
              style={{ fontSize: "30px" }}
            />
          ) : (
            <PlayCircleOutlined
              className="pauseplay"
              onClick={playPauseClickHandler}
              style={{ fontSize: "30px" }}
            />
          )}
          <StepForwardOutlined
            className="forback"
            onClick={forwardClickHandler}
            style={{ fontSize: "24px" }}
          />
        </div>
        <div className="track-progress">
          {formatMilliseconds(trackProgress)} / {formatMilliseconds(300000)}
        </div>
      </center>
    </div>
  );
};

export default PlaybackBar;
