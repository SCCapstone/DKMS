import fetchServer from "@/lib/fetch/fetchServer";

const getPlaybackState = async () =>
  fetchServer<SpotifyApi.CurrentPlaybackResponse>(
    `https://api.spotify.com/v1/me/player/`
  );

export default getPlaybackState;
