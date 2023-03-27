// eslint-disable-next-line @typescript-eslint/no-unused-vars
import putSpotifyData from "@/lib/putSpotifyData";

import getAccessToken from "../getAccessToken";

const skipNext = async (
  uri: string,
  isTrackPlaying: boolean,
  isSkipToNext = false
) => {
  const endpoint = isSkipToNext
    ? "https://api.spotify.com/v1/me/player/next"
    : "https://api.spotify.com/v1/me/player/play";
  // eslint-disable-next-line no-nested-ternary
  const method = isSkipToNext ? "POST" : isTrackPlaying ? "DELETE" : "PUT";
  const body: string | null = !isSkipToNext
    ? JSON.stringify({ uris: [uri] })
    : null;

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
