import fetchServer from "@/lib/fetch/fetchServer";

/**
 * Fetches user's playlist
 *
 * @param userId id of user to fetch playlists for
 * @param limit limit on the number of playlists to return
 * @returns list of user's playlists
 */
const getPlaylistsForUser = async (userId: string, limit: number) =>
  fetchServer<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>(
    `https://api.spotify.com/v1/users/${userId}/playlists?limit=${limit}`
  );

export default getPlaylistsForUser;
