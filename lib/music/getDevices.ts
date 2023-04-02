import fetchServer from "@/lib/fetch/fetchServer";

/**
 * Retrieves a list of devices available to the user.
 * @returns A SpotifyApi.UserDevicesResponse value containing a list of available devices.
 */
async function getDevices() {
  await fetchServer<SpotifyApi.UserDevicesResponse>(
    `https://api.spotify.com/v1/me/player/devices`,
    {
      cache: "no-cache",
    }
  );
}
export default getDevices;
