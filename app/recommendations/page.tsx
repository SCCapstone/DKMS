import Track from "@/components/music/Track";
import PageTitle from "@/components/ui/PageTitle";
import { getCurrentUser } from "@/lib/getUser";
import getRecommendations from "@/lib/recommendations/getRecommendations";

const Recommendations = async () => {
  const user = await getCurrentUser();
  const recsData = await getRecommendations(user.id);

  return (
    <>
      <PageTitle title="Recommendations" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recsData.tracks.map((rec) => (
          // @ts-expect-error Next 13 handles async components
          <Track key={rec.id} track={rec} />
        ))}
      </div>
    </>
  );
};

export default Recommendations;
