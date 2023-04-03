import { doc, getDoc } from "firebase/firestore";

import { profilesCol } from "@/lib/firestore";

import getRecommendationsBySeed from "./getRecommendationsBySeed";

const DEFAULT_ARTIST = "4NHQUGzhtTLFvgF5SZesLK";
const DEFAULT_TRACK = "0c6xIDDpzE81m2q797ordA";

const getRecommendationsForUser = async (userId: string, limit?: number) => {
  const profile = await getDoc(doc(profilesCol, userId));

  if (!profile.exists()) {
    return getRecommendationsBySeed({
      seedArtists: DEFAULT_ARTIST,
      seedTracks: DEFAULT_TRACK,
    });
  }

  const data = profile.data();

  return getRecommendationsBySeed({
    seedArtists: data.topArtists.slice(0, 1).map((artist) => artist.id),
    seedTracks: data.topTracks.slice(0, 2).map((track) => track.id),
    limit,
  });
};

export default getRecommendationsForUser;
