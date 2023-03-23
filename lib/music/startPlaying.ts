import putSpotifyData from "@/lib/putSpotifyData";

import getAccessToken from "../getAccessToken";

const startPlaying = async (uri: string, isTrackPlaying: boolean) =>
  putSpotifyData(`https://api.spotify.com/v1/me/player/play`, {
    method: isTrackPlaying ? "DELETE" : "PUT",
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

export default startPlaying;
