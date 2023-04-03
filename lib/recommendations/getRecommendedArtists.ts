import { getCachedProfileDoc } from "@/lib/firestore/cache";

import fetchServer from "../fetch/fetchServer";

const DEFAULT_ARTIST = "4NHQUGzhtTLFvgF5SZesLK";

const getRecommendedArtistData = async (id: string, limit?: number) => {
  const data = await fetchServer<SpotifyApi.ArtistsRelatedArtistsResponse>(
    `https://api.spotify.com/v1/artists/${id}/related-artists`
  );
  return data.artists.slice(0, limit);
};

const getRecommendedArtists = async (userId: string, limit?: number) => {
  const profile = await getCachedProfileDoc(userId);

  if (!profile.exists()) {
    return getRecommendedArtistData(DEFAULT_ARTIST, limit);
  }

  const artists = profile.data().topArtists;
  const randomIndex = Math.floor(Math.random() * artists.length);
  const { id } = artists[randomIndex];

  return getRecommendedArtistData(id, limit);
};

export default getRecommendedArtists;
