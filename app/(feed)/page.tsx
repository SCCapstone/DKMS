import FeedPage from "@/components/feed";
import PageTitle from "@/components/ui/PageTitle";
import { getFeedItems } from "@/lib/feed";
import { getCurrentUser } from "@/lib/getUser";

const Feed = async () => {
  const data = await getFeedItems();
  const currentUser = await getCurrentUser();

  return (
    <div>
      <PageTitle title="Feed" />
      <FeedPage data={data} currentUser={currentUser} showLinks />
    </div>
  );
};

export default Feed;