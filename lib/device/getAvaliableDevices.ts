import fetchServer from "@/lib/fetch/fetchServer";

/* Get available devices from spotify of logged in user */
const getAvailableDevices = async () => {
  const devices = await fetchServer<SpotifyApi.UserDevicesResponse>(
    `https://api.spotify.com/v1/me/player/devices`,
    {
      cache: "no-cache",
    }
  );
  return devices.devices.filter((device) => device.id !== null);
};

export default getAvailableDevices;
