import getSpotifyData from "@/lib/getSpotifyData";

import AlbumView from "./AlbumView";

const getData = async (id: string) => {
  const album = await getSpotifyData<SpotifyApi.AlbumObjectFull>(
    `https://api.spotify.com/v1/albums/${id}`
  );
  const artist = await getSpotifyData<SpotifyApi.ArtistObjectFull>(
    `https://api.spotify.com/v1/artists/${album.artists[0].id}`
  );

  return { album, artist };
};

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const data = await getData(id);
  return <AlbumView album={data.album} artist={data.artist} />;
};

export default Page;
