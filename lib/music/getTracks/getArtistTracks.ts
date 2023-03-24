import getSpotifyData from "@/lib/getSpotifyData";

const getArtistTracks = async (artistId: string) =>
  getSpotifyData<SpotifyApi.ArtistsTopTracksResponse>(
    `https://api.spotify.com/v1/artist/${artistId}/top-tracks?country=US`,
    {
      cache: "no-cache",
    }
  );

export default getArtistTracks;
