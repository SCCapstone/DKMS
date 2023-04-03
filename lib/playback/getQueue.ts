import fetchServer from "@/lib/fetch/fetchServer";

const getQueue = async () => {
  const data = await fetchServer<SpotifyApi.UsersQueueResponse>(
    "https://api.spotify.com/v1/me/player/queue"
  );
  return data;
};

export default getQueue;
