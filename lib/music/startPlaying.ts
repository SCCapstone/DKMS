"use client";

import fetchClient from "@/lib/fetch/fetchClient";

const startPlaying = async (uri: string) =>
  fetchClient(`https://api.spotify.com/v1/me/player/play`, {
    method: "PUT",
    body: JSON.stringify({
      context_uri: uri,
    }),
    cache: "no-cache",
  });

export default startPlaying;
