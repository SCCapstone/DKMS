import fetchServer from "@/lib/fetch/fetchServer";

const getAvailableDevices = async () => {
  const devices = await fetchServer<SpotifyApi.UserDevicesResponse>(
    `https://api.spotify.com/v1/me/player/devices`
  );
  return devices.devices.filter((device) => device.id !== null);
};

export default getAvailableDevices;
