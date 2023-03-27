import { Track } from "@/components/music/cards";
import PageTitle from "@/components/ui/PageTitle";
import { getCurrentUser } from "@/lib/getUser";
import getRecommendationsForUser from "@/lib/recommendations/getRecommendationsForUser";

const Recommendations = async () => {
  const user = await getCurrentUser();
  const recsData = await getRecommendationsForUser(user.id, 8);

  return (
    <>
      <PageTitle title="Tracks For You" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recsData.tracks.map((rec) => (
          /* @ts-expect-error Next 13 handles async components */
          <Track key={rec.id} track={rec} />
        ))}
      </div>
    </>
  );
};

export default Recommendations;
