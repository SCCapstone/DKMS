import getSpotifyData from "@/lib/getSpotifyData";

const isUserFollowing = async (username: string) => {
  const response =
    await getSpotifyData<SpotifyApi.UserFollowsUsersOrArtistsResponse>(
      `https://api.spotify.com/v1/me/following/contains?type=user&ids=${username}`
    );
  return response[0];
};

export default isUserFollowing;
