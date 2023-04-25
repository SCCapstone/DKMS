import fetchServer from "@/lib/fetch/fetchServer";
import isUserFollowing from "@/lib/followers/isUserFollowing";
import getAverageAudioFeatures from "@/lib/getAverageAudioFeatures";
import { getCurrentUserPremium } from "@/lib/getUser";

import ArtistView from "./ArtistView";

/* Get data for artist */
const getData = async (id: string) => {
  /* Fetch artist data */
  const artist = await fetchServer<SpotifyApi.ArtistObjectFull>(
    `https://api.spotify.com/v1/artists/${id}`
  );

  /* Fetch artist's top tracks */
  const topTracks = await fetchServer<SpotifyApi.ArtistsTopTracksResponse>(
    `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`
  );

  /* Fetch artist's albums */
  const albums = await fetchServer<SpotifyApi.ArtistsAlbumsResponse>(
    `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&market=US&limit=10`
  );

  /* Fetch audio features for artist */
  const audioFeatures =
    await fetchServer<SpotifyApi.MultipleAudioFeaturesResponse>(
      `https://api.spotify.com/v1/audio-features?ids=${topTracks.tracks
        .map((track) => track.id)
        .join(",")}`
    );

  /* Fetch similar artists' data for current artist */
  const similarArtistsData =
    await fetchServer<SpotifyApi.ArtistsRelatedArtistsResponse>(
      `https://api.spotify.com/v1/artists/${id}/related-artists`
    );
  const similarArtists = similarArtistsData.artists.slice(0, 4);

  const averageAudioFeatures = getAverageAudioFeatures(audioFeatures);

  const isFollowing = await isUserFollowing(id, "artist");

  return {
    artist,
    topTracks,
    albums,
    isFollowing,
    averageAudioFeatures,
    similarArtists,
  };
};

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const data = await getData(id);
  const isPremium = await getCurrentUserPremium();

  return (
    <ArtistView
      artist={data.artist}
      topTracks={data.topTracks}
      albums={data.albums}
      isFollowing={data.isFollowing}
      averageAudioFeatures={data.averageAudioFeatures}
      similarArtists={data.similarArtists}
      isPremium={isPremium}
    />
  );
};

export default Page;
