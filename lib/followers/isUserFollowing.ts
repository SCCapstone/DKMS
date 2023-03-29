import fetchServer from "@/lib/fetch/fetchServer";

/**
 * Checks if the current user is following a user or artist.
 * @param usernameOrId The Spotify username of the user to check or ID of the artist to check.
 * @returns A boolean value indicating if the current user is following the selected entity.
 */
async function isUserFollowing(
  usernameOrId: string,
  followType: "user" | "artist"
): Promise<boolean>;

/**
 * Checks if the current user is following a list of users or artists.
 * Can only check one type (cannot check both users and artists in the same call)
 *
 * @param usernamesOrIds The Spotify usernames of the users to check or IDs of the artists to check.
 * @returns A list of boolean values indicating if the current user is following the selected entities.
 */
async function isUserFollowing(
  usernamesOrIds: string[],
  followType: "user" | "artist"
): Promise<boolean[]>;

async function isUserFollowing(
  usernameOrId: string | string[],
  followType: "user" | "artist"
) {
  const data = await fetchServer<SpotifyApi.UserFollowsUsersOrArtistsResponse>(
    `https://api.spotify.com/v1/me/following/contains?type=${followType}&ids=${usernameOrId.toString()}`,
    {
      cache: "no-cache",
    }
  );
  return typeof usernameOrId === "string" ? data[0] : data;
}
export default isUserFollowing;
