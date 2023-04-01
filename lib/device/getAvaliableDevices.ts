import fetchClient from "../fetch/fetchClient";

type RequestWithDeviceIds = RequestInit & {
  device_ids: string[];
};

const setActiveDevice = async (deviceId: string) => {
  await fetchClient("https://api.spotify.com/v1/me/player", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      device_ids: [deviceId],
      play: false,
    } as RequestWithDeviceIds),
  });

  // handle response
};

export default setActiveDevice;
