import { doc, getDoc } from "firebase/firestore";

import fetchServer from "@/lib/fetch/fetchServer";
import { profilesCol } from "@/lib/firestore";

import getRecommendationsBySeed from "./getRecommendationsBySeed";

const DEFAULT_ARTIST = "4NHQUGzhtTLFvgF5SZesLK";
const DEFAULT_TRACK = "0c6xIDDpzE81m2q797ordA";

const getProfile = async (userId: string) => getDoc(doc(profilesCol, userId));

const getRecommendedArtistData = async (id: string, limit?: number) => {
  const data = await fetchServer<SpotifyApi.ArtistsRelatedArtistsResponse>(
    `https://api.spotify.com/v1/artists/${id}/related-artists`
  );
  return data.artists.slice(0, limit);
};

export const getRecommendedArtists = async (userId: string, limit?: number) => {
  const profile = await getProfile(userId);

  if (!profile.exists()) {
    return getRecommendedArtistData(DEFAULT_ARTIST, limit);
  }

  const artists = profile.data().topArtists;
  const randomIndex = Math.floor(Math.random() * artists.length);
  const { id } = artists[randomIndex];

  return getRecommendedArtistData(id, limit);
};

export const getRecommendationsForUser = async (
  userId: string,
  limit?: number
) => {
  const profile = await getProfile(userId);

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
