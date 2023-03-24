import getSpotifyData from "@/lib/getSpotifyData";

const getAlbumTracks = async (albumId: string) =>
  getSpotifyData<SpotifyApi.AlbumTracksResponse>(
    `https://api.spotify.com/v1/albums/${albumId}/tracks`,
    {
      cache: "no-cache",
    }
  );

export default getAlbumTracks;
