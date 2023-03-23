import Track from "@/components/music/Track";
import { getCurrentUser } from "@/lib/getUser";
import getRecommendations from "@/lib/recommendations/getRecommendations";

import BasePanel from "./BasePanel";

const Recommendations = async () => {
  const user = await getCurrentUser();
  const recsData = await getRecommendations(user.id);

  return (
    <BasePanel title="Recommendations" sidebarId="recommendations">
      {recsData.tracks.map((rec) => (
        /* @ts-expect-error Next 13 handles async components */
        <Track key={rec.id} track={rec} />
      ))}
    </BasePanel>
  );
};

export default Recommendations;
