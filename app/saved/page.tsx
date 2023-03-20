import FeedPage from "@/components/feed";
import FilterFeedButtons from "@/components/feed/FilterFeedButtons";
import PageTitle from "@/components/ui/PageTitle";
import { getCurrentUser } from "@/lib/getUser";
import { getSavedFeedItems, getSavedFeedItemsList } from "@/lib/savedFeedItems";

const Saved = async () => {
  const currentUser = await getCurrentUser();
  const data = await getSavedFeedItems(currentUser.id);
  const savedItemIds = await getSavedFeedItemsList(currentUser.id);

  return (
    <div>
      <PageTitle title="Feed" />
      <FilterFeedButtons filterActive />
      <FeedPage
        data={data}
        currentUser={currentUser}
        savedItemIds={savedItemIds}
      />
    </div>
  );
};

export default Saved;
