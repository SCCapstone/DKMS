import FeedPage from "@/components/feed";
import PageTitle from "@/components/ui/PageTitle";
import getFeedItems from "@/lib/feed/getFeedItems";
import { getCurrentUser, getCurrentUserPremium } from "@/lib/getUser";
import getSavedItemIds from "@/lib/savedFeedItems/getSavedItemIds";

const Feed = async ({
  searchParams,
}: {
  searchParams: {
    /** Filter by saved items */ s: string | undefined;
  };
}) => {
  const { s } = searchParams;
  /* Get feed items only of users that logged in user is following */
  const data = await getFeedItems({
    filterByFollowing: true,
    filterBySaved: !!s,
  });
  const currentUser = await getCurrentUser();
  const savedItemIds = await getSavedItemIds(currentUser.id);
  const isPremium = await getCurrentUserPremium();

  return (
    <div>
      <PageTitle title="Friends" />
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

export default Feed;
