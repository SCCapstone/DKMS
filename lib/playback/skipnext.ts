import putSpotifyData from "@/lib/putSpotifyData";

import getAccessToken from "../getAccessToken";

const next = async (
  uri: string,
  isTrackPlaying: boolean,
  isSkipToPrevious = false
) => {
  let endpoint = "https://api.spotify.com/v1/me/player/play";
  let method = "PUT";
  let body: string | null = JSON.stringify({
    uris: [uri],
  });

  if (isSkipToPrevious) {
    endpoint = "https://api.spotify.com/v1/me/player/next";
    method = "POST";
    body = null;
  } else if (isTrackPlaying) {
    method = "DELETE";
  }

  const headers = {
    Authorization: JSON.stringify({
      getAccessToken,
    }),
    "Content-Type": "application/json",
  };

  await putSpotifyData(endpoint, { method, headers, body });
};

export default next;
