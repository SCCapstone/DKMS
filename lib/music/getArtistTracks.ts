import getSpotifyData from "@/lib/getSpotifyData";

const getArtistTracks = async (artistId: string) =>
  getSpotifyData<SpotifyApi.SingleArtistResponse>(
    `https://api.spotify.com/v1/artist/${artistId}/top-tracks?country=US`
  );

export default getArtistTracks;
