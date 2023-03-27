import getAverageAudioFeatures from "@/lib/getAverageAudioFeatures";
import getSpotifyData from "@/lib/getSpotifyData";

import AlbumView from "./AlbumView";

const getData = async (id: string) => {
  const album = await getSpotifyData<SpotifyApi.SingleAlbumResponse>(
    `https://api.spotify.com/v1/albums/${id}`
  );
  const artist = await getSpotifyData<SpotifyApi.SingleArtistResponse>(
    `https://api.spotify.com/v1/artists/${album.artists[0].id}`
  );

  const audioFeatures =
    await getSpotifyData<SpotifyApi.MultipleAudioFeaturesResponse>(
      `https://api.spotify.com/v1/audio-features?ids=${album.tracks.items
        .map((track) => track.id)
        .join(",")}`
    );

  const averageAudioFeatures = getAverageAudioFeatures(audioFeatures);

  return { album, artist, averageAudioFeatures };
};

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const data = await getData(id);
  return (
    <AlbumView
      album={data.album}
      artist={data.artist}
      averageAudioFeatures={data.averageAudioFeatures}
    />
  );
};

export default Page;
