import { getCachedProfileDoc } from "@/lib/firestore/cache";

import getRecommendationsBySeed from "./getRecommendationsBySeed";
import { TARGET_MAPPING } from "./recommendationTargets";

import type { TargetOption } from "./recommendationTargets";

const DEFAULT_ARTIST = "4NHQUGzhtTLFvgF5SZesLK";
const DEFAULT_TRACK = "0c6xIDDpzE81m2q797ordA";

const isValidTarget = (target: string | undefined): target is TargetOption =>
  !!target && target in TARGET_MAPPING;

/**
 * Gets recommendations for a certain user
 *
 * @param userId id of user to get recommendations for
 * @param limit number of return values to limit to
 * @param target optional target value to help focus recommendations
 * @returns A list of recommendations for the user
 */
const getRecommendationsForUser = async (
  userId: string,
  limit?: number,
  target?: string
) => {
  const profile = await getCachedProfileDoc(userId);

  if (!profile.exists()) {
    return getRecommendationsBySeed({
      seedArtists: DEFAULT_ARTIST,
      seedTracks: DEFAULT_TRACK,
    });
  }
  const { topArtists, topTracks } = profile.data();

  if (topArtists.length < 2 || topTracks.length < 2) {
    return getRecommendationsBySeed({
      seedArtists: DEFAULT_ARTIST,
      seedTracks: DEFAULT_TRACK,
    });
  }

  const targetParam = isValidTarget(target)
    ? TARGET_MAPPING[target]
    : undefined;

  return getRecommendationsBySeed({
    seedArtists: topArtists.slice(0, 1).map((artist) => artist.id),
    seedTracks: topTracks.slice(0, 2).map((track) => track.id),
    limit,
    target: targetParam,
  });
};

export default getRecommendationsForUser;
