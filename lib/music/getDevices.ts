import getSpotifyData from "@/lib/getSpotifyData";

const getDevices = async () =>
  getSpotifyData<SpotifyApi.UserDevicesResponse>(
    `https://api.spotify.com/v1/me/player/devices`
  );

export default getDevices;
