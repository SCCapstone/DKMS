import fetchServer from "@/lib/fetch/fetchServer";

/**
 * Retrieves the user's queue.
 * @returns A SpotifyApi.UserQueueResponse value containing the user's queue.
 */
async function getQueue() {
  await fetchServer<SpotifyApi.UserDevicesResponse>(
    `https://api.spotify.com/v1/me/player/queue`,
    {
      cache: "no-cache",
    }
  );
}
export default getQueue;
