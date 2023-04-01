import putSpotifyData from "../putSpotifyData";

const transferPlayback = async (deviceId: string) => {
  const response = await putSpotifyData(
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
