import putSpotifyData from "@/lib/putSpotifyData";

const skipNext = async (
  uri: string,
  isTrackPlaying: boolean,
  isSkipToNext = false
) => {
  const endpoint = isSkipToNext
    ? "https://api.spotify.com/v1/me/player/next"
    : "https://api.spotify.com/v1/me/player/play";

  let method = "";
  if (isSkipToNext) {
    method = "POST";
  } else if (isTrackPlaying) {
    method = "DELETE";
  } else {
    method = "PUT";
  }

  const body: string | null = !isSkipToNext
    ? JSON.stringify({ uris: [uri] })
    : null;

  await putSpotifyData(endpoint, {
    method,
    body,
  });
};

export default skipNext;
