import putSpotifyData from "@/lib/putSpotifyData";

import getAccessToken from "../getAccessToken";

const skipNext = async (
  uri: string,
  isTrackPlaying: boolean,
  isSkipToNext = false
) => {
  let endpoint = "https://api.spotify.com/v1/me/player/play";
  let method = "PUT";
  let body: string | null = JSON.stringify({
    uris: [uri],
  });
  // Skip to next song
  if (isSkipToNext) {
    endpoint = "https://api.spotify.com/v1/me/player/next";
    method = "POST";
    body = null;
  } else if (isTrackPlaying) {
    method = "DELETE";
  }

  const accessToken = await getAccessToken();

  const response = await fetch(endpoint, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body,
  });

  if (!response.ok) {
    throw new Error(`Failed to skip track: ${response.statusText}`);
  }
};

export default skipNext;
