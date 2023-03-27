import putSpotifyData from "@/lib/putSpotifyData";

import getAccessToken from "../getAccessToken";

const resume = async () => {
  const method = "PUT";
  const endpoint = "play";
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
      position_ms: null,
    }),
  });
  return true;
};

export default resume;
