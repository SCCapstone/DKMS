import fetchServer from "@/lib/fetch/fetchServer";

/**
 * Fetches queue for playback
 *
 * @returns array of data for tracks that are queued
 */
const getQueue = async () => {
  const data = await fetchServer<SpotifyApi.UsersQueueResponse>(
    "https://api.spotify.com/v1/me/player/queue"
  );
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return data.queue.filter((item) => item !== null);
};

export default getQueue;
