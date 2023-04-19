import fetchServer from "@/lib/fetch/fetchServer";

import TrackView from "./TrackView";

const getData = async (id: string) => {
  const track = await fetchServer<SpotifyApi.TrackObjectFull>(
    `https://api.spotify.com/v1/tracks/${id}`,
    {
      next: {
        revalidate: false,
      },
    }
  );
  const artist = await fetchServer<SpotifyApi.ArtistObjectFull>(
    `https://api.spotify.com/v1/artists/${track.artists[0].id}`,
    {
      next: {
        revalidate: false,
      },
    }
  );

  const audioFeatures = await fetchServer<SpotifyApi.AudioFeaturesResponse>(
    `https://api.spotify.com/v1/audio-features/${id}`,
    {
      next: {
        revalidate: false,
      },
    }
  );

  const recommendations =
    await fetchServer<SpotifyApi.RecommendationsFromSeedsResponse>(
      `https://api.spotify.com/v1/recommendations?seed_tracks=${id}&limit=10`,
      {
        next: {
          revalidate: false,
        },
      }
    );

  return { track, artist, audioFeatures, recommendations };
};

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const data = await getData(id);
  return (
    <TrackView
      track={data.track}
      artist={data.artist}
      audioFeatures={data.audioFeatures}
      recommendations={data.recommendations}
    />
  );
};

export default Page;
