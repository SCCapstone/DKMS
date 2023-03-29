import fetchServer from "@/lib/fetch/fetchServer";
import isUserFollowing from "@/lib/followers/isUserFollowing";
import getAverageAudioFeatures from "@/lib/getAverageAudioFeatures";

import ArtistView from "./ArtistView";

const getData = async (id: string) => {
  const artist = await fetchServer<SpotifyApi.ArtistObjectFull>(
    `https://api.spotify.com/v1/artists/${id}`
  );

  const topTracks = await fetchServer<SpotifyApi.ArtistsTopTracksResponse>(
    `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`
  );

  const albums = await fetchServer<SpotifyApi.ArtistsAlbumsResponse>(
    `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&market=US&limit=10`
  );

  const audioFeatures =
    await fetchServer<SpotifyApi.MultipleAudioFeaturesResponse>(
      `https://api.spotify.com/v1/audio-features?ids=${topTracks.tracks
        .map((track) => track.id)
        .join(",")}`
    );

  const averageAudioFeatures = getAverageAudioFeatures(audioFeatures);

  const isFollowing = await isUserFollowing(id, "artist");

  return { artist, topTracks, albums, isFollowing, averageAudioFeatures };
};

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const data = await getData(id);

  return (
    <ArtistView
      artist={data.artist}
      topTracks={data.topTracks}
      albums={data.albums}
      isFollowing={data.isFollowing}
      averageAudioFeatures={data.averageAudioFeatures}
    />
  );
};

export default Page;
