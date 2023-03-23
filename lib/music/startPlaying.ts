import putSpotifyData from "@/lib/putSpotifyData";

import getAccessToken from "../getAccessToken";

const startPlaying = async (uri: string) =>
  putSpotifyData(`https://api.spotify.com/v1/me/player/play`, {
    method: "PUT",
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
