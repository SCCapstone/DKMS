import { doc, getDoc } from "firebase/firestore";

import { profilesCol } from "@/lib/firestore";

import getRecommendationsBySeed from "./getRecommendationsBySeed";

const DEFAULT_ARTIST = "4NHQUGzhtTLFvgF5SZesLK";
const DEFAULT_TRACK = "0c6xIDDpzE81m2q797ordA";

const TARGET_MAPPING = {
  acoustic: { key: "target_acoustic", value: 0.8 },
  danceable: { key: "target_danceability", value: 0.8 },
  energetic: { key: "target_energy", value: 0.8 },
  quiet: { key: "target_energy", value: 0.2 },
  live: { key: "target_liveness", value: 0.8 },
  popular: { key: "target_popularity", value: 80 },
  niche: { key: "target_popularity", value: 20 },
  happy: { key: "target_valence", value: 0.8 },
  sad: { key: "target_valence", value: 0.2 },
} as const;

type TargetOption = keyof typeof TARGET_MAPPING;
const isValidTarget = (target: string | undefined): target is TargetOption =>
  !!target && target in TARGET_MAPPING;

const getRecommendationsForUser = async (
  userId: string,
  limit?: number,
  target?: string
) => {
  const profile = await getDoc(doc(profilesCol, userId));

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
