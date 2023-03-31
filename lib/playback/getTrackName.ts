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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: CurrentlyPlayingResponse = await response.json();
    const trackName = data.item.name || null;
    const artistName = data.item.artists[0]?.name || null;
    return { trackName, artistName };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error parsing JSON response:", error);
    return { trackName: null, artistName: null };
  }
};

export default getTrackName;
