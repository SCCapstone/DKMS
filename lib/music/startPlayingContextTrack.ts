import fetchClient from "@/lib/fetch/fetchClient";

const startPlayingContextTrack = async (
  contextUri: string,
  offset: string,
  trackUri: string
) =>
  fetchClient(`https://api.spotify.com/v1/me/player/play`, {
    method: "PUT",
    body: JSON.stringify({
      context_uri: contextUri || undefined,
      offset: offset ? { uri: offset } : undefined,
      uris: trackUri ? [trackUri] : undefined,
    }),
    cache: "no-cache",
  });

export default startPlayingContextTrack;
