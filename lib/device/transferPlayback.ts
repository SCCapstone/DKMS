import fetchClient from "@/lib/fetch/fetchClient";

const transferPlayback = async (
  deviceId: string | null,
  startPlaying: boolean
) =>
  fetchClient(`https://api.spotify.com/v1/me/player`, {
    method: "PUT",
    body: JSON.stringify({
      device_ids: [deviceId],
      play: startPlaying,
    }),
  });

export default transferPlayback;
