import getSpotifyData from "../getSpotifyData";

const isUserFollowing = async (username: string) =>
  getSpotifyData<SpotifyApi.UserFollowsUsersOrArtistsResponse>(
    `https://api.spotify.com/v1/me/following/contains?type=user&ids=${username}`
  ).then((response) => response[0]);

export default isUserFollowing;
