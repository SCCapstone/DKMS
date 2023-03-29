import putSpotifyData from "../putSpotifyData";

const getCurrentPlaybackPosition = async () => {
  const response = await putSpotifyData(
    "https://api.spotify.com/v1/me/player",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to get current playback position: ${response.status} ${response.statusText}`
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await response.json();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return data.is_playing && data.item && data.item.uri ? data.progress_ms : 0;
};

export default getCurrentPlaybackPosition;
