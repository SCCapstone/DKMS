import getSpotifyData from "@/lib/getSpotifyData";

const getPlaylistTracks = async (playlistId: string) =>
  getSpotifyData<SpotifyApi.PlaylistTrackResponse>(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      cache: "no-cache",
    }
  );

export default getPlaylistTracks;
