import FeedPage from "@/components/feed";
import PageTitle from "@/components/ui/PageTitle";
import getFeedItems from "@/lib/feed/getFeedItems";
import { getCurrentUser, getCurrentUserPremium } from "@/lib/getUser";
import getSavedItemIds from "@/lib/savedFeedItems/getSavedItemIds";

/* Discover feed page */
const DiscoverFeed = async ({
  searchParams,
}: {
  searchParams: {
    /** Filter by saved items */ s: string | undefined;
  };
}) => {
  const { s } = searchParams;
  /* Get feed items of all users */
  const data = await getFeedItems({
    filterBySaved: !!s,
  });
  const currentUser = await getCurrentUser();
  const savedItemIds = await getSavedItemIds(currentUser.id);
  const isPremium = await getCurrentUserPremium();

  return (
    <div>
      <PageTitle title="Discover" />
      <FeedPage
        data={data}
        currentUser={currentUser}
        savedItemIds={savedItemIds}
        showLinks
        isPremium={isPremium}
      />
    </div>
  );
};

export default DiscoverFeed;
