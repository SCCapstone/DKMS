import { Track } from "@/components/music/cards";
import getRecommendationsForUser from "@/lib/recommendations/getRecommendationsForUser";

const RecommendationsGrid = async ({
  userId,
  amount,
}: {
  userId: string;
  amount?: number;
}) => {
  const recsData = await getRecommendationsForUser(userId, amount);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {recsData.tracks.map((rec) => (
        /* @ts-expect-error Next 13 handles async components */
        <Track key={rec.id} track={rec} />
      ))}
    </div>
  );
};

export default RecommendationsGrid;
