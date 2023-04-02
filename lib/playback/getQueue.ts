import fetchServer from "@/lib/fetch/fetchServer";

const getQueue = () =>
  fetchServer<SpotifyApi.UsersQueueResponse>(
    "https://api.spotify.com/v1/me/player/queue"
  );

export default getQueue;
