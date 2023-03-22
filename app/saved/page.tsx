import FeedPage from "@/components/feed";
import FilterSavedFeedButton from "@/components/feed/FilterSavedFeedButton";
import PageTitle from "@/components/ui/PageTitle";
import { getCurrentUser } from "@/lib/getUser";
import { getSavedFeedItems, getSavedFeedItemsList } from "@/lib/savedFeedItems";

const Saved = async () => {
  const currentUser = await getCurrentUser();
  const data = await getSavedFeedItems(currentUser.id);
  const savedItemIds = await getSavedFeedItemsList(currentUser.id);

  return (
    <>
      <PageTitle title="Feed" />
      <FilterSavedFeedButton filterActive />
      <FeedPage
        data={data}
        currentUser={currentUser}
        savedItemIds={savedItemIds}
      />
    </>
  );
};

export default Saved;
