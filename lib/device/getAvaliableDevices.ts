import putSpotifyData from "../putSpotifyData";

type Device = {
  id: string;
  name: string;
};

type GetDevicesResponse = {
  devices: Device[];
};

const getAvailableDevices = async (): Promise<Device[]> => {
  const response: Response = await putSpotifyData(
    "https://api.spotify.com/v1/me/player/devices",
    {
      headers: {},
    }
  );

  const data = (await response.json()) as GetDevicesResponse;

  return data.devices;
};

export default getAvailableDevices;
