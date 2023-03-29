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
  const data: CurrentlyPlayingResponse =
    (await response.json()) as CurrentlyPlayingResponse;
  const trackName = data.item.name || null;
  const artistName = data.item.artists[0]?.name || null;
  return { trackName, artistName }; // return the track name and artist name, or null if none is playing
};

export default getTrackName;
