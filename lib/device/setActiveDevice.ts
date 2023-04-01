import putSpotifyData from "../putSpotifyData";

type RequestWithDeviceIds = RequestInit & {
  device_ids: string[];
};

const setActiveDevice = async (deviceId: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const response = await putSpotifyData(
    "https://api.spotify.com/v1/me/player",
    {
      device_ids: [deviceId],
      play: false,
    } as RequestWithDeviceIds
  );

  // handle response
};

export default setActiveDevice;
