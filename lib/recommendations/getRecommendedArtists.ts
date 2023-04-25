import { getCachedProfileDoc } from "@/lib/firestore/cache";

import fetchServer from "../fetch/fetchServer";

const DEFAULT_ARTIST = "4NHQUGzhtTLFvgF5SZesLK";

/**
 * Fetches data of recommended artists
 *
 * @param id id of artist
 * @param limit limit of number of returned artists
 * @returns data for recommended artists
 */
const getRecommendedArtistData = async (id: string, limit?: number) => {
  const data = await fetchServer<SpotifyApi.ArtistsRelatedArtistsResponse>(
    `https://api.spotify.com/v1/artists/${id}/related-artists`,
    {
      next: {
        revalidate: false,
      },
    }
  );
  return data.artists.slice(0, limit);
};

/**
 * Gets recommended artists for users
 *
 * @param userId id of user to get recommended artists for
 * @param limit limit on number of artists to return
 * @returns list of recommended artists
 */
const getRecommendedArtists = async (userId: string, limit?: number) => {
  const profile = await getCachedProfileDoc(userId);

  if (!profile.exists()) {
    return getRecommendedArtistData(DEFAULT_ARTIST, limit);
  }

  const { topArtists } = profile.data();

  if (topArtists.length === 0) {
    return getRecommendedArtistData(DEFAULT_ARTIST, limit);
  }
  const randomIndex = Math.floor(Math.random() * topArtists.length);
  const { id } = topArtists[randomIndex];

  return getRecommendedArtistData(id, limit);
};

export default getRecommendedArtists;
