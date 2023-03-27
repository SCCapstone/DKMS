import { TracksGrid } from "@/components/music/grids";
import PageTitle from "@/components/ui/PageTitle";
import getSpotifyData from "@/lib/getSpotifyData";
import { getCurrentUser } from "@/lib/getUser";
import getRecommendationsForUser from "@/lib/recommendations/getRecommendationsForUser";

const getData = async (userId: string) => {
  const recommendations = await getRecommendationsForUser(userId, 8);
  const featuredPlaylists =
    await getSpotifyData<SpotifyApi.ListOfFeaturedPlaylistsResponse>(
      `https://api.spotify.com/v1/browse/featured-playlists?limit=8`
    );

  return { recommendations, featuredPlaylists };
};
const Recommendations = async () => {
  const user = await getCurrentUser();
  const data = await getData(user.id);

  return (
    <>
      <PageTitle title="Tracks For You" />
      <TracksGrid tracks={data.recommendations.tracks} />
      {/* <TopPlaylists userId={user.id} amount={8} /> */}
    </>
  );
};

export default Recommendations;
