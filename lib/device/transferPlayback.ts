import fetchClient from "../fetch/fetchClient";

const transferPlayback = async (deviceId: string): Promise<boolean> => {
  const response: Response = await fetchClient(
    "https://api.spotify.com/v1/me/player",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        device_ids: [deviceId],
        play: false,
      }),
    }
  );

  return response.ok;
};

export default transferPlayback;
