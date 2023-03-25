import putSpotifyData from "@/lib/putSpotifyData";

import getAccessToken from "../getAccessToken";

const play = async (uri: string, isTrackPlaying: boolean) => {
  const method = isTrackPlaying ? "PUT" : "PUT";
  const endpoint = isTrackPlaying ? "pause" : "play";
  const url = `https://api.spotify.com/v1/me/player/${endpoint}`;
  const token = await getAccessToken();
  const response = await putSpotifyData(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uris: [uri],
    }),
  });
  return !isTrackPlaying;
};

export default play;
