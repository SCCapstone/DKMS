import FeedPage from "@/components/feed";
import PageTitle from "@/components/ui/PageTitle";
import getFeedItems from "@/lib/feed/getFeedItems";
import { getCurrentUser } from "@/lib/getUser";
import getSavedItemIds from "@/lib/savedFeedItems/getSavedItemIds";

const Feed = async ({
  searchParams,
}: {
  searchParams: {
    /** Filter by saved items */ s: string | undefined;
  };
}) => {
  const { s } = searchParams;
  const data = await getFeedItems({
    filterByFollowing: true,
    filterBySaved: !!s,
  });
  const currentUser = await getCurrentUser();
  const savedItemIds = await getSavedItemIds(currentUser.id);

  return (
    <div>
      <PageTitle title="Friends" />
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

/**
 * @see https://beta.nextjs.org/docs/api-reference/file-conventions/page#searchparams-optional
 */
export const dynamic = "force-dynamic";
