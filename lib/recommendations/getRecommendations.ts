import { doc, getDoc } from "firebase/firestore";

import getSpotifyData from "@/lib/getSpotifyData";

import { profilesCol } from "../firestore";

const getRecommendations = async (userId: string) => {
  const profile = await getDoc(doc(profilesCol, userId));

  const data = profile.data();
  const artist1 = data?.topArtists[0].id ?? "4NHQUGzhtTLFvgF5SZesLK";
  const artist2 = data?.topArtists[1].id ?? "4NHQUGzhtTLFvgF5SZesLK";
  const track1 = data?.topTracks[0].id ?? "0c6xIDDpzE81m2q797ordA";
  const track2 = data?.topTracks[1].id ?? "0c6xIDDpzE81m2q797ordA";
  const track3 = data?.topTracks[2].id ?? "0c6xIDDpzE81m2q797ordA";

  return getSpotifyData<SpotifyApi.RecommendationsFromSeedsResponse>(
    `https://api.spotify.com/v1/recommendations?seed_artists=${artist1},${artist2}&
    seed_tracks=${track1},${track2},${track3}`,
    {
      cache: "no-cache",
    }
  );
};

export default getRecommendations;
