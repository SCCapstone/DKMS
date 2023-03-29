import putSpotifyData from "../putSpotifyData";

const getCurrentTrackUri = async () => {
  const response = await putSpotifyData(
    "https://api.spotify.com/v1/me/player/"
  );

  // todo if not empty.... etc
  return response.json();

  /* const data: CurrentlyPlayingResponse = await response.json();
  return data.item.uri || null; // return the track URI, or null if none is playing */
};

export default getCurrentTrackUri;
