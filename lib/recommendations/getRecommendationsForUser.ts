import { getCachedProfileDoc } from "@/lib/firestore/cache";

import getRecommendationsBySeed from "./getRecommendationsBySeed";
import { TARGET_MAPPING } from "./recommendationTargets";

import type { TargetOption } from "./recommendationTargets";

const DEFAULT_ARTIST = "4NHQUGzhtTLFvgF5SZesLK";
const DEFAULT_TRACK = "0c6xIDDpzE81m2q797ordA";

const isValidTarget = (target: string | undefined): target is TargetOption =>
  !!target && target in TARGET_MAPPING;

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

  const targetParam = isValidTarget(target)
    ? TARGET_MAPPING[target]
    : undefined;

  const data = profile.data();

  return getRecommendationsBySeed({
    seedArtists: data.topArtists.slice(0, 1).map((artist) => artist.id),
    seedTracks: data.topTracks.slice(0, 2).map((track) => track.id),
    limit,
    target: targetParam,
  });
};

export default getRecommendationsForUser;
