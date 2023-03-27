import putSpotifyData from "@/lib/putSpotifyData";

const startPlaying = async (uri: string) =>
  putSpotifyData(`https://api.spotify.com/v1/me/player/play`, {
    method: "PUT",
    body: JSON.stringify({
      uris: [uri],
    }),
  });

export default startPlaying;
