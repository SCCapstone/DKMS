import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

// Set the access token for the API instance after authentication
spotifyApi.setAccessToken("YOUR_ACCESS_TOKEN_HERE");
/*
// Get the currently playing track
spotifyApi.getMyCurrentPlaybackState().then((response) => {
  const { item, is_playing, progress_ms } = response;

  // Create the playback bar HTML elements
  const playbackBar = document.createElement("div");
  playbackBar.classList.add("playback-bar");

  const playbackInfo = document.createElement("div");
  playbackInfo.classList.add("playback-info");
  playbackBar.appendChild(playbackInfo);

  const playbackControls = document.createElement("div");
  playbackControls.classList.add("playback-controls");
  playbackBar.appendChild(playbackControls);

  const playbackProgress = document.createElement("progress");
  playbackProgress.classList.add("playback-progress");
  playbackProgress.value = progress_ms ?? 0; // Use nullish coalescing operator to provide default value
  playbackProgress.max = item?.duration_ms ?? 0; // Use optional chaining operator to access duration_ms property
  playbackControls.appendChild(playbackProgress);

  const playPauseButton = document.createElement("button");
  playPauseButton.classList.add("playback-button");
  playPauseButton.innerText = is_playing ? "Pause" : "Play";
  playbackControls.appendChild(playPauseButton);

  const nextButton = document.createElement("button");
  nextButton.classList.add("playback-button");
  nextButton.innerText = "Next";
  playbackControls.appendChild(nextButton);

  const prevButton = document.createElement("button");
  prevButton.classList.add("playback-button");
  prevButton.innerText = "Previous";
  playbackControls.appendChild(prevButton);

  const trackName = document.createElement("div");
  trackName.classList.add("track-name");
  trackName.innerText = item?.name ?? "";
  playbackInfo.appendChild(trackName);

  const artistName = document.createElement("div");
  artistName.classList.add("artist-name");
  artistName.innerText = item?.artists[0].name ?? "";
  playbackInfo.appendChild(artistName);

  // Add event listeners for the playback buttons
  playPauseButton.addEventListener("click", () => {
    const promise = is_playing ? spotifyApi.pause() : spotifyApi.play();
    promise
      .then(() => {
        playPauseButton.innerText = is_playing ? "Play" : "Pause";
      })
      .catch((error) => {
        console.error(`An error occurred: ${error}`);
      });
  });

  nextButton.addEventListener("click", () => {
    spotifyApi.skipToNext().catch((error) => {
      console.error(`An error occurred: ${error}`);
    });
  });

  prevButton.addEventListener("click", () => {
    spotifyApi.skipToPrevious().catch((error) => {
      console.error(`An error occurred: ${error}`);
    });
  });

  // Append the playback bar to the page
  const playbackContainer = document.getElementById("playback-container");
  if (playbackContainer !== null) {
    playbackContainer.appendChild(playbackBar);
  }
}); */

spotifyApi.getMyCurrentPlaybackState()
  .then((response) => {
    const { item, is_playing, progress_ms } = response;

    // Create the playback bar HTML elements
    const playbackBar = document.createElement("div");
    playbackBar.classList.add("playback-bar");

    const playbackInfo = document.createElement("div");
    playbackInfo.classList.add("playback-info");
    playbackBar.appendChild(playbackInfo);

    const playbackControls = document.createElement("div");
    playbackControls.classList.add("playback-controls");
    playbackBar.appendChild(playbackControls);

    const playbackProgress = document.createElement("progress");
    playbackProgress.classList.add("playback-progress");
    playbackProgress.value = progress_ms ?? 0; // Use nullish coalescing operator to provide default value
    playbackProgress.max = item?.duration_ms ?? 0; // Use optional chaining operator to access duration_ms property
    playbackControls.appendChild(playbackProgress);

    const playPauseButton = document.createElement("button");
    playPauseButton.classList.add("playback-button");
    playPauseButton.innerText = is_playing ? "Pause" : "Play";
    playbackControls.appendChild(playPauseButton);

    const nextButton = document.createElement("button");
    nextButton.classList.add("playback-button");
    nextButton.innerText = "Next";
    playbackControls.appendChild(nextButton);

    const prevButton = document.createElement("button");
    prevButton.classList.add("playback-button");
    prevButton.innerText = "Previous";
    playbackControls.appendChild(prevButton);

    const trackName = document.createElement("div");
    trackName.classList.add("track-name");
    trackName.innerText = item?.name ?? "";
    playbackInfo.appendChild(trackName);

    const artistName = document.createElement("div");
    artistName.classList.add("artist-name");
    artistName.innerText = item?.artists[0].name ?? "";
    playbackInfo.appendChild(artistName);

    // Add event listeners for the playback buttons
    playPauseButton.addEventListener("click", () => {
      const promise = is_playing ? spotifyApi.pause() : spotifyApi.play();
      promise
        .then(() => {
          playPauseButton.innerText = is_playing ? "Play" : "Pause";
        })
        .catch((error) => {
          console.error(`An error occurred: ${error}`);
        });
    });

    nextButton.addEventListener("click", () => {
      spotifyApi.skipToNext().catch((error) => {
        console.error(`An error occurred: ${error}`);
      });
    });

    prevButton.addEventListener("click", () => {
      spotifyApi.skipToPrevious().catch((error) => {
        console.error(`An error occurred: ${error}`);
      });
    });

    // Append the playback bar to the page
    const playbackContainer = document.getElementById("playback-container");
    if (playbackContainer !== null) {
      playbackContainer.appendChild(playbackBar);
    }
  })
  .catch((error: string) => {
    console.error(`An error occurred: ${error}`);
  });
