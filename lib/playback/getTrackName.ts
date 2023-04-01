import putSpotifyData from "../putSpotifyData";

type CurrentlyPlayingResponse = {
  item: {
    name: string;
    artists: {
      name: string;
    }[];
  };
};

const getTrackName = async () => {
  const response = await putSpotifyData(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  try {
    const data: unknown = await response.json();
    const currentPlaying = data as CurrentlyPlayingResponse;
    const trackName = currentPlaying.item.name || null;
    const artistName = currentPlaying.item.artists[0]?.name || null;
    return { trackName, artistName };
  } catch (error) {
    return { trackName: null, artistName: null };
  }
};

export default getTrackName;
