import putSpotifyData from "../putSpotifyData";

type PlaybackData = {
  is_playing: boolean;
  item: {
    uri: string;
  };
  progress_ms: number;
};

const getCurrentPlaybackPosition = async (): Promise<number> => {
  const response: Response = await putSpotifyData(
    "https://api.spotify.com/v1/me/player",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data: PlaybackData = (await response.json()) as PlaybackData;

  return data.is_playing && data.item.uri ? data.progress_ms : 0;
};

export default getCurrentPlaybackPosition;
