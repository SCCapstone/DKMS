import fetchServer from "@/lib/fetch/fetchServer";
import getDanceRecommendations from "@/lib/getDanceRecommendations";
import { getCurrentUserPremium } from "@/lib/getUser";

import TrackView from "./TrackView";

/* Fetch data for track */
const getData = async (id: string) => {
  /* Fetch track data */
  const track = await fetchServer<SpotifyApi.TrackObjectFull>(
    `https://api.spotify.com/v1/tracks/${id}`,
    {
      next: {
        revalidate: false,
      },
    }
  );

  /* Fetch data for track's artist */
  const artist = await fetchServer<SpotifyApi.ArtistObjectFull>(
    `https://api.spotify.com/v1/artists/${track.artists[0].id}`,
    {
      next: {
        revalidate: false,
      },
    }
  );

  /* Fetch data for track's audio features */
  const audioFeatures = await fetchServer<SpotifyApi.AudioFeaturesResponse>(
    `https://api.spotify.com/v1/audio-features/${id}`,
    {
      next: {
        revalidate: false,
      },
    }
  );

  /* Fetch recommendations for track */
  const recommendations =
    await fetchServer<SpotifyApi.RecommendationsFromSeedsResponse>(
      `https://api.spotify.com/v1/recommendations?seed_tracks=${id}&limit=10`,
      {
        next: {
          revalidate: false,
        },
      }
    );

  /* fetch dance recommendations for track */
  const danceRecommendations = getDanceRecommendations(
    audioFeatures.tempo,
    audioFeatures.time_signature
  );

  return {
    track,
    artist,
    audioFeatures,
    recommendations,
    danceRecommendations,
  };
};

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const data = await getData(id);
  const isPremium = await getCurrentUserPremium();

  return (
    <TrackView
      track={data.track}
      artist={data.artist}
      audioFeatures={data.audioFeatures}
      recommendations={data.recommendations}
      danceRecommendations={data.danceRecommendations}
      isPremium={isPremium}
    />
  );
};

export default Page;
