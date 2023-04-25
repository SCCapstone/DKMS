import fetchServer from "@/lib/fetch/fetchServer";

/**
 * Gets recommendations by seed tracks or artists
 *
 * @param seedArtists artist or artists to base recommendations on
 * @param seedTracks track or tracks to base recommendations on
 * @param limit limit on how many recommendations are returned
 * @param target target value to focus for recommendations
 * @returns A list of recommendations based on seeds
 */
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
