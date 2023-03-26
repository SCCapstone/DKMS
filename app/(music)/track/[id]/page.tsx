import getSpotifyData from "@/lib/getSpotifyData";

import TrackView from "./TrackView";

const getData = async (id: string) => {
  const track = await getSpotifyData<SpotifyApi.TrackObjectFull>(
    `https://api.spotify.com/v1/tracks/${id}`
  );
  const artist = await getSpotifyData<SpotifyApi.ArtistObjectFull>(
    `https://api.spotify.com/v1/artists/${track.artists[0].id}`
  );

  const audioFeatures = await getSpotifyData<SpotifyApi.AudioFeaturesResponse>(
    `https://api.spotify.com/v1/audio-features/${id}`
  );

  const recommendations =
    await getSpotifyData<SpotifyApi.RecommendationsFromSeedsResponse>(
      `https://api.spotify.com/v1/recommendations?seed_tracks=${id}&limit=10`
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
