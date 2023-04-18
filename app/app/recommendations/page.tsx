import {
  ArtistsGrid,
  PlaylistsGrid,
  TracksGrid,
} from "@/components/music/grids";
import RecommendationFilterButtons from "@/components/RecommendationFilterButtons";
import PageTitle from "@/components/ui/PageTitle";
import fetchServer from "@/lib/fetch/fetchServer";
import { getCurrentUser } from "@/lib/getUser";
import getRecommendationsForUser from "@/lib/recommendations/getRecommendationsForUser";
import getRecommendedArtists from "@/lib/recommendations/getRecommendedArtists";

const getData = async (userId: string, target?: string) => {
  const recommendations = await getRecommendationsForUser(userId, 8, target);
  const recommendedArtists = await getRecommendedArtists(userId, 8);
  const featuredPlaylists =
    await fetchServer<SpotifyApi.ListOfFeaturedPlaylistsResponse>(
      `https://api.spotify.com/v1/browse/featured-playlists?limit=8`
    );

  return { recommendations, recommendedArtists, featuredPlaylists };
};
const Recommendations = async ({
  searchParams,
}: {
  searchParams: {
    /** Filter by saved items */ target: string | undefined;
  };
}) => {
  const user = await getCurrentUser();
  const data = await getData(user.id, searchParams.target);

  return (
    <>
      <PageTitle title="Recommendations" />
      <RecommendationFilterButtons />
      <h4 className="font-black uppercase pb-2">Recommended Songs</h4>
      <TracksGrid tracks={data.recommendations.tracks} />
      <div className="divider" />
      <h4 className="font-black uppercase pb-2">Recommended Artists</h4>
      <ArtistsGrid artists={data.recommendedArtists} />
      <div className="divider" />
      <h4 className="font-black uppercase pb-2">Featured Playlists</h4>
      <PlaylistsGrid playlists={data.featuredPlaylists.playlists.items} />
    </>
  );
};

export default Recommendations;
