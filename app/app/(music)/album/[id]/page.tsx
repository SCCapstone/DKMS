import fetchServer from "@/lib/fetch/fetchServer";
import getAverageAudioFeatures from "@/lib/getAverageAudioFeatures";
import { getCurrentUserPremium } from "@/lib/getUser";

import AlbumView from "./AlbumView";

/* Get data for album */
const getData = async (id: string) => {
  /* Get data for album */
  const album = await fetchServer<SpotifyApi.SingleAlbumResponse>(
    `https://api.spotify.com/v1/albums/${id}`
  );
  /* Get data about album's artist */
  const artist = await fetchServer<SpotifyApi.SingleArtistResponse>(
    `https://api.spotify.com/v1/artists/${album.artists[0].id}`
  );

  /* Get audio feature data about album */
  const audioFeatures =
    await fetchServer<SpotifyApi.MultipleAudioFeaturesResponse>(
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
  const isPremium = await getCurrentUserPremium();

  return (
    <AlbumView
      album={data.album}
      artist={data.artist}
      averageAudioFeatures={data.averageAudioFeatures}
      isPremium={isPremium}
    />
  );
};

export default Page;
