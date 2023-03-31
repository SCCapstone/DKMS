import fetchServer from "./fetch/fetchServer";

const getPlaylistsForUser = async (userId: string, limit: number) =>
  fetchServer<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>(
    `https://api.spotify.com/v1/users/${userId}/playlists?limit=${limit}`
  );

export default getPlaylistsForUser;
