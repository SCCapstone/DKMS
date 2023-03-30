"use client";

import fetchClient from "@/lib/fetch/fetchClient";

const startPlayingContextTrack = async (contextUri: string, trackUri: string) =>
  fetchClient(`https://api.spotify.com/v1/me/player/play`, {
    method: "PUT",
    body: JSON.stringify({
      context_uri: contextUri,
      offset: trackUri,
    }),
    cache: "no-cache",
  });

export default startPlayingContextTrack;
