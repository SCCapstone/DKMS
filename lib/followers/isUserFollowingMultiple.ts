import getSpotifyData from "@/lib/getSpotifyData";

const isUserFollowingMultiple = async (usernames: string) =>
  getSpotifyData<SpotifyApi.UserFollowsUsersOrArtistsResponse>(
    `https://api.spotify.com/v1/me/following/contains?type=user&ids=${usernames}`,
    {
      cache: "no-cache",
    }
  );

export default isUserFollowingMultiple;
