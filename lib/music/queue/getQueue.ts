import getSpotifyData from "@/lib/getSpotifyData";

const getQueue = async () =>
  getSpotifyData<SpotifyApi.UsersQueueResponse>(
    `https://api.spotify.com/v1/me/player/queue`
  );

export default getQueue;
