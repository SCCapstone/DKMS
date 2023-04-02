import fetchServer from "@/lib/fetch/fetchServer";

const getPlaybackState = async () =>
  fetchServer<SpotifyApi.CurrentPlaybackResponse>(
    `https://api.spotify.com/v1/me/player/`,
    {
      cache: "no-cache",
    }
  );

export default getPlaybackState;
