import putSpotifyData from "@/lib/putSpotifyData";

import getAccessToken from "../getAccessToken";

const pause = async (uri: string, isTrackPlaying: boolean) => {
  const method = isTrackPlaying ? "PUT" : "PUT";
  const endpoint = isTrackPlaying ? "pause" : "play";
  const url = `https://api.spotify.com/v1/me/player/pause${endpoint}`;
  const response = await putSpotifyData(url, {
    method,
    headers: {
      Authorization: JSON.stringify({
        getAccessToken,
      }),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uris: [uri],
    }),
  });
  return response;
};

export default pause;
