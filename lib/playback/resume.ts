import putSpotifyData from "@/lib/putSpotifyData";

const resume = async () => {
  const method = "PUT";
  const endpoint = "play";
  const url = `https://api.spotify.com/v1/me/player/${endpoint}`;

  await putSpotifyData(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      position_ms: null,
    }),
  });
};

export default resume;
