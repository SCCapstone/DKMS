import putSpotifyData from "../putSpotifyData";

const getCurrentTrackUri = async () => {
  const response = await putSpotifyData(
    "https://api.spotify.com/v1/me/player/"
  );

  return response.json();
};

export default getCurrentTrackUri;
