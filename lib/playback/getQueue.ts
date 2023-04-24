import fetchServer from "@/lib/fetch/fetchServer";

const getQueue = async () => {
  const data = await fetchServer<SpotifyApi.UsersQueueResponse>(
    "https://api.spotify.com/v1/me/player/queue"
  );
  return {
    queue: [null, ...data.queue] as (
      | SpotifyApi.TrackObjectFull
      | SpotifyApi.EpisodeObjectFull
    )[],
  };
};

export default getQueue;
