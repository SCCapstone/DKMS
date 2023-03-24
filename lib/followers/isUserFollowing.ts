import getSpotifyData from "@/lib/getSpotifyData";

const isUserFollowing = async (username: string) =>
  getSpotifyData<SpotifyApi.UserFollowsUsersOrArtistsResponse>(
    `https://api.spotify.com/v1/me/following/contains?type=user&ids=${username}`,
    {
      cache: "no-cache",
    }
  ).then((response) => response[0]);

export default isUserFollowing;
