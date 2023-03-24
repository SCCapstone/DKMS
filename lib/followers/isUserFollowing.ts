import getSpotifyData from "@/lib/getSpotifyData";

const isUserFollowing = async (
  usernameOrId: string,
  followType: "user" | "artist"
) =>
  getSpotifyData<SpotifyApi.UserFollowsUsersOrArtistsResponse>(
    `https://api.spotify.com/v1/me/following/contains?type=${followType}&ids=${usernameOrId}`,
    {
      cache: "no-cache",
    }
  ).then((response) => response[0]);

export default isUserFollowing;
