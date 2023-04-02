import fetchServer from "@/lib/fetch/fetchServer";

const getPlaybackState = async () => {
  try {
    const res = await fetchServer<SpotifyApi.CurrentPlaybackResponse>(
      `https://api.spotify.com/v1/me/player/`,
      {
        cache: "no-cache",
      }
    );
    return res;
  } catch {
    return undefined;
  }
};

export default getPlaybackState;
