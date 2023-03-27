import FeedPage from "@/components/feed";
import FilterSavedFeedButton from "@/components/feed/FilterSavedFeedButton";
import PageTitle from "@/components/ui/PageTitle";
import getFeedItems from "@/lib/feed/getFeedItems";
import { getCurrentUser } from "@/lib/getUser";
import { getSavedFeedItemsList } from "@/lib/savedFeedItems";

const Feed = async () => {
  const data = await getFeedItems();
  const currentUser = await getCurrentUser();
  const savedItemIds = await getSavedFeedItemsList(currentUser.id);

  return (
    <div>
      <PageTitle title="Feed" />
      <FilterSavedFeedButton />
      <FeedPage
        data={data}
        currentUser={currentUser}
        savedItemIds={savedItemIds}
        showLinks
      />
    </div>
  );
};

export default Feed;
