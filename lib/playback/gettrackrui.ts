import getAccessToken from "../getAccessToken";

type CurrentlyPlayingResponse = {
  item: {
    uri: string;
  };
};

const getCurrentTrackUri = async () => {
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
  // todo if not empty.... etc
  return response.json();

  /* const data: CurrentlyPlayingResponse = await response.json();
  return data.item.uri || null; // return the track URI, or null if none is playing */
};

export default getCurrentTrackUri;
