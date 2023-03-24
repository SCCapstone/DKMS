import putSpotifyData from "@/lib/putSpotifyData";

const addToQueue = async (uri: string, isTrackPlaying: boolean) =>
  putSpotifyData(`https://api.spotify.com/v1/me/player/play`, {
    method: isTrackPlaying ? "DELETE" : "PUT",
    body: JSON.stringify({
      uris: [uri],
    }),
  });

export default addToQueue;
