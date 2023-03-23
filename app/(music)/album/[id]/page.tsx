import getSpotifyData from "@/lib/getSpotifyData";

import AlbumView from "./AlbumView";

const getData = async (id: string) =>
  getSpotifyData<SpotifyApi.AlbumObjectFull>(
    `https://api.spotify.com/v1/albums/${id}`
  );

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const album = await getData(id);
  return <AlbumView album={album} />;
};

export default Page;
