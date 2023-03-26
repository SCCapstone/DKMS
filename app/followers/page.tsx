import { getDocs, collection } from "firebase/firestore";

import FeedPage from "@/components/feed";
import FilterSavedFeedButton from "@/components/feed/FilterSavedFeedButton";
import PageTitle from "@/components/ui/PageTitle";
import { getFeedItems } from "@/lib/feed";
import firestore from "@/lib/firestore";
import isUserFollowing from "@/lib/followers/isUserFollowing";
import { getCurrentUser } from "@/lib/getUser";
import { getSavedFeedItemsList } from "@/lib/savedFeedItems";

type FollowingUser = {
  id: string;
};

const Feed = async () => {
  const feedItems = await getFeedItems();
  const currentUser = await getCurrentUser();
  // TODO : get following user ids for current user
  async function getFollowingUserIds() {
    const followingCol = collection(
      firestore,
      "users",
      currentUser.id,
      "following"
    );
    const followingSnapshot = await getDocs(followingCol);
    const followingData = followingSnapshot.docs.map((doc) => {
      const data = doc.data() as FollowingUser;
      return data.id;
    });
    return followingData;
  }
  const followingUserIds = await getFollowingUserIds();

  function checkFeedItemPostedByUserInFollowing(feedItem: {
    username: string;
  }) {
    const { username } = feedItem;
    let ret = false;
    followingUserIds.forEach((followingUserId: string) => {
      if (followingUserId === username) {
        ret = true;
      }
    });
    return ret;
  }
  const followingData = feedItems.filter(checkFeedItemPostedByUserInFollowing);

  const savedItemIds = await getSavedFeedItemsList(currentUser.id);
  return (
    <div>
      <PageTitle title="Feed" />
      <FilterSavedFeedButton />
      <FeedPage
        data={followingData}
        currentUser={currentUser}
        savedItemIds={savedItemIds}
        showLinks
      />
    </div>
  );
};

export default Feed;
