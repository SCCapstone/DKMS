import getSpotifyData from "@/lib/getSpotifyData";

import ArtistView from "./ArtistView";

const getData = async (id: string) => {
  const artist = await getSpotifyData<SpotifyApi.ArtistObjectFull>(
    `https://api.spotify.com/v1/artists/${id}`
  );

  const topTracks = await getSpotifyData<SpotifyApi.ArtistsTopTracksResponse>(
    `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`
  );

  const albums = await getSpotifyData<SpotifyApi.ArtistsAlbumsResponse>(
    `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&market=US&limit=10`
  );

  return { artist, topTracks, albums };
};

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const data = await getData(id);

  return (
    <ArtistView
      artist={data.artist}
      topTracks={data.topTracks}
      albums={data.albums}
    />
  );
};

export default Page;
