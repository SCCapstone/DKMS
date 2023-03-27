import RecommendationsGrid from "@/components/music/RecommendationsGrid";
import PageTitle from "@/components/ui/PageTitle";
import { getCurrentUser } from "@/lib/getUser";

const Recommendations = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <PageTitle title="Tracks For You" />
      {/* @ts-expect-error Next 13 handles async components */}
      <RecommendationsGrid userId={user.id} amount={8} />
    </>
  );
};

export default Recommendations;
