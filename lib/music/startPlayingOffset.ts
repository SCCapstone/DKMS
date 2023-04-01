"use client";

import fetchClient from "@/lib/fetch/fetchClient";

async function startPlayingOffset(contextUri: string, uriOffset: string) {
  return fetchClient(`https://api.spotify.com/v1/me/player/play`, {
    method: "PUT",
    body: JSON.stringify({
      context_uri: contextUri,
      offset: uriOffset,
    }),
    cache: "no-cache",
  });
}
export default startPlayingOffset;
