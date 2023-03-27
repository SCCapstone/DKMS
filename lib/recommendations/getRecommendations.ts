import { doc, getDoc } from "firebase/firestore";

import fetchServer from "@/lib/fetch/fetchServer";

import { profilesCol } from "../firestore";

const getRecommendations = async (userId: string) => {
  const profile = await getDoc(doc(profilesCol, userId));

  const data = profile.data();
  const topArtists = data?.topArtists ?? [];
  const topTracks = data?.topTracks ?? [];
  const artist1 = topArtists[0]?.id ?? "4NHQUGzhtTLFvgF5SZesLK";
  const artist2 = topArtists[1]?.id ?? "4NHQUGzhtTLFvgF5SZesLK";
  const track1 = topTracks[0]?.id ?? "0c6xIDDpzE81m2q797ordA";
  const track2 = topTracks[1]?.id ?? "0c6xIDDpzE81m2q797ordA";
  const track3 = topTracks[2]?.id ?? "0c6xIDDpzE81m2q797ordA";

  return fetchServer<SpotifyApi.RecommendationsFromSeedsResponse>(
    `https://api.spotify.com/v1/recommendations?seed_artists=${artist1},${artist2}&
    seed_tracks=${track1},${track2},${track3}`,
    {
      cache: "no-cache",
    }
  );
};

export default getRecommendations;
