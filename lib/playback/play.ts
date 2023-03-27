import putSpotifyData from "@/lib/putSpotifyData";

import getAccessToken from "../getAccessToken";

const play = async (
  uri: string,
  isTrackPlaying: boolean,
  shouldResume: boolean
) => {
  const method = isTrackPlaying ? "PUT" : "PUT";
  const endpoint = isTrackPlaying ? "pause" : "play";
  const url = `https://api.spotify.com/v1/me/player/${endpoint}`;
  const token = await getAccessToken();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const response = await putSpotifyData(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uris: [uri],
      position_ms: shouldResume ? null : undefined, // Set position_ms to null if resuming, undefined otherwise
    }),
  });
  return !isTrackPlaying;
};

export default play;
