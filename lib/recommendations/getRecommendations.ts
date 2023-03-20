import { doc, getDoc } from "firebase/firestore";

import getSpotifyData from "@/lib/getSpotifyData";

import { profilesCol } from "../firestore";

const getRecommendations = async (userId: string) => {
  const profile = await getDoc(doc(profilesCol, userId));

  const artist1 = profile.data()?.topArtists[0].id ?? "4NHQUGzhtTLFvgF5SZesLK";
  const artist2 = profile.data()?.topArtists[1].id ?? "4NHQUGzhtTLFvgF5SZesLK";
  const track1 = profile.data()?.topTracks[0].id ?? "0c6xIDDpzE81m2q797ordA";
  const track2 = profile.data()?.topTracks[1].id ?? "0c6xIDDpzE81m2q797ordA";
  const track3 = profile.data()?.topTracks[3].id ?? "0c6xIDDpzE81m2q797ordA";

  return getSpotifyData<SpotifyApi.RecommendationsFromSeedsResponse>(
    `https://api.spotify.com/v1/recommendations?seed_artists=${artist1},${artist2}&
    seed_tracks=${track1},${track2},${track3}`
  );
};

export default getRecommendations;
