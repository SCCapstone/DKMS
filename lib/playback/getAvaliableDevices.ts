import putSpotifyData from "../putSpotifyData";

const getAvailableDevices = async () => {
  const response = await putSpotifyData(
    "https://api.spotify.com/v1/me/player/devices",
    {
      headers: {},
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await response.json();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return data.devices;
};

export default getAvailableDevices;
