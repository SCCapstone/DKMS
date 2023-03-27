import FeedPage from "@/components/feed";
import PageTitle from "@/components/ui/PageTitle";
import getFeedItems from "@/lib/feed/getFeedItems";
import { getCurrentUser } from "@/lib/getUser";
import { getSavedFeedItemsList } from "@/lib/savedFeedItems";

const DiscoverFeed = async ({
  searchParams,
}: {
  searchParams: {
    /** Filter by saved items */ s: string | undefined;
  };
}) => {
  const { s } = searchParams;
  const data = await getFeedItems({
    filterBySaved: !!s,
  });
  const currentUser = await getCurrentUser();
  const savedItemIds = await getSavedFeedItemsList(currentUser.id);

  return (
    <div>
      <PageTitle title="Discover" />
      <FeedPage
        data={data}
        currentUser={currentUser}
        savedItemIds={savedItemIds}
        showLinks
      />
    </div>
  );
};

export default DiscoverFeed;
