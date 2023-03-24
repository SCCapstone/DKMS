import postSpotifyData from "@/lib/postSpotifyData";

const addToQueue = async (uri: string) =>
  postSpotifyData(`https://api.spotify.com/v1/me/player/queue`, {
    method: "POST",
    body: JSON.stringify({
      uris: [uri],
    }),
  });

export default addToQueue;
