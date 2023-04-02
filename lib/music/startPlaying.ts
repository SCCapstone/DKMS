"use client";

import fetchClient from "@/lib/fetch/fetchClient";

type StartPlayingContextParams =
  | {
      uris: string[];
      contextUri?: undefined;
      offset?: undefined;
    }
  | {
      uris?: undefined;
      contextUri: string;
      offset?: string;
    }
  | {
      uris: string[];
      contextUri: string;
      offset?: undefined;
    };

async function startPlaying(params: StartPlayingContextParams) {
  return fetchClient(`https://api.spotify.com/v1/me/player/play`, {
    method: "PUT",
    body: JSON.stringify({
      context_uri: params.contextUri,
      uris: params.uris,
      offset: params.offset ? { uri: params.offset } : undefined,
    }),
    cache: "no-cache",
  });
}
export default startPlaying;
export type { StartPlayingContextParams };
