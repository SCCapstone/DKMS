"use client";
import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { StepBackwardOutlined, StepForwardOutlined, PauseCircleOutlined, PlayCircleOutlined} from "@ant-design/icons";

const spotifyApi = new SpotifyWebApi();

function PlaybackBar(): JSX.Element {
  const [trackName, setTrackName] = useState<string>('');
  const [artistName, setArtistName] = useState<string>('');
  const [albumImageUrl, setAlbumImageUrl] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access_token');
    spotifyApi.setAccessToken(accessToken);

    spotifyApi.getMyCurrentPlaybackState().then(response => {
      if (response && response.item) {
        setTrackName(response.item.name);
        setArtistName(response.item.artists[0].name);
        setAlbumImageUrl(response.item.album.images[0].url);
        setIsPlaying(response.is_playing);
        setTrackProgress(response.progress_ms || 0);
      }
    });
  }, []);

  function handlePlayPauseClick(): void {
    if (isPlaying) {
      spotifyApi.pause().then(() => {
        setIsPlaying(false);
      });
    } else {
      spotifyApi.play().then(() => {
        setIsPlaying(true);
      });
    }
  }

  function handleSkipPreviousClick(): void {
    spotifyApi.skipToPrevious().then(() => {
      setTrackProgress(0);
    });
  }

  function handleSkipNextClick(): void {
    spotifyApi.skipToNext().then(() => {
      setTrackProgress(0);
    });
  }

  function formatMilliseconds(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      spotifyApi.getMyCurrentPlaybackState().then(response => {
        if (response && response.item) {
          setTrackName(response.item.name);
          setArtistName(response.item.artists[0].name);
          setAlbumImageUrl(response.item.album.images[0].url);
          setIsPlaying(response.is_playing);
          setTrackProgress(response.progress_ms || 0);
        }
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <center>
      <img className="album-image" src={albumImageUrl} />
      <div className="track-info">
        <div className="track-name">{trackName}</div>
        <div className="artist-name">{artistName}</div>
      </div>
        <div className="buttons">
          <StepBackwardOutlined className="forback" onClick={handleSkipPreviousClick} style={{ fontSize: '24px' }}/>
          {isPlaying ? 
            <PauseCircleOutlined className="pauseplay" onClick={handlePlayPauseClick} style={{ fontSize: '30px' }}/> :
            <PlayCircleOutlined className="pauseplay" onClick={handlePlayPauseClick} style={{ fontSize: '30px' }}/>
          }
          <StepForwardOutlined className="forback" onClick={handleSkipNextClick} style={{ fontSize: '24px' }}/>
        </div>
        <div className="track-progress">
        {formatMilliseconds(trackProgress)} / {formatMilliseconds(300000)}
        </div>
      </center>
    </div>
  );
}

export default PlaybackBar; 
