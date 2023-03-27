import getSpotifyData from "@/lib/getSpotifyData";

const isUserFollowingMultiple = async (usernames: string) => {
  const response =
    await getSpotifyData<SpotifyApi.UserFollowsUsersOrArtistsResponse>(
      `https://api.spotify.com/v1/me/following/contains?type=user&ids=${usernames}`,
      {
        cache: "no-cache",
      }
    );

  return response;
};

export default isUserFollowingMultiple;
