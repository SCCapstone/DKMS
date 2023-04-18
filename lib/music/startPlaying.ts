"use client";

import fetchClient from "@/lib/fetch/fetchClient";

export type StartPlayingContextParams =
  | {
      uris: string[];
      contextUri?: undefined;
      offset?: undefined;
      deviceId?: string;
    }
  | {
      uris?: undefined;
      contextUri: string;
      offset?: string;
      deviceId?: string;
    }
  | {
      uris: string[];
      contextUri: string;
      offset?: undefined;
      deviceId?: string;
    };

async function startPlaying(params: StartPlayingContextParams) {
  return fetchClient(
    `https://api.spotify.com/v1/me/player/play${
      params.deviceId ? `?device_id=${params.deviceId}` : ""
    }`,
    {
      method: "PUT",
      body: JSON.stringify({
        context_uri: params.contextUri,
        uris: params.uris,
        offset: params.offset ? { uri: params.offset } : undefined,
      }),
      cache: "no-cache",
    }
  );
}
export default startPlaying;
