import putSpotifyData from "@/lib/putSpotifyData";

const clearQueue = async (uri: string) =>
  putSpotifyData(`https://api.spotify.com/v1/me/player/queue`, {
    method: "PUT",
    body: JSON.stringify({
      uris: [uri],
    }),
  });

export default clearQueue;
