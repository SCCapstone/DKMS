import fetchServer from "@/lib/fetch/fetchServer";

const getRecommendationsBySeed = async ({
  seedArtists,
  seedTracks,
  limit = 20,
}: {
  seedArtists: string[] | string;
  seedTracks: string[] | string;
  limit?: number;
}) =>
  fetchServer<SpotifyApi.RecommendationsFromSeedsResponse>(
    `https://api.spotify.com/v1/recommendations?seed_artists=${seedArtists.toString()}&seed_tracks=${seedTracks.toString()}&limit=${limit.toString()}`
  );

export default getRecommendationsBySeed;
