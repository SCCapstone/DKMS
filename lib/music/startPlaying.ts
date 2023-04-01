"use client";

import fetchClient from "@/lib/fetch/fetchClient";

type StartPlayingContextParams =
  | {
      uris: string[];
      contextUri?: undefined;
    }
  | {
      uris?: undefined;
      contextUri: string;
    }
  | {
      uris: string[];
      contextUri: string;
    };

async function startPlaying(params: StartPlayingContextParams) {
  return fetchClient(`https://api.spotify.com/v1/me/player/play`, {
    method: "PUT",
    body: JSON.stringify({
      context_uri: params.contextUri,
      uris: params.uris,
    }),
    cache: "no-cache",
  });
}
export default startPlaying;
export type { StartPlayingContextParams };
