import fetchServer from "@/lib/fetch/fetchServer";

const getRecommendationsBySeed = async ({
  seedArtists,
  seedTracks,
  limit = 20,
  target,
}: {
  seedArtists: string[] | string;
  seedTracks: string[] | string;
  limit?: number;
  target?: { key: string; value: number };
}) => {
  const urlParams = new URLSearchParams({
    seed_artists: seedArtists.toString(),
    seed_tracks: seedTracks.toString(),
    limit: limit.toString(),
  });
  if (target) urlParams.append(target.key, target.value.toString());
  return fetchServer<SpotifyApi.RecommendationsFromSeedsResponse>(
    `https://api.spotify.com/v1/recommendations?${urlParams.toString()}`,
    {
      next: {
        revalidate: false,
      },
    }
  );
};

export default getRecommendationsBySeed;
