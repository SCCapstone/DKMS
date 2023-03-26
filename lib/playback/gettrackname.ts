import getAccessToken from "../getAccessToken";

type CurrentlyPlayingResponse = {
  item: {
    name: string;
  };
};

const getTrackName = async () => {
  const token = await getAccessToken();
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data: CurrentlyPlayingResponse =
    (await response.json()) as CurrentlyPlayingResponse;
  return data.item.name || null; // return the track name, or null if none is playing
};

export default getTrackName;
