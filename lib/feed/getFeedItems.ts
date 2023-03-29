import { getDocs, orderBy, query } from "firebase/firestore";

import { feedCol } from "@/lib/firestore";
import getUsersFollowing from "@/lib/followers/getUsersFollowing";
import { getCurrentUser } from "@/lib/getUser";
import { getSavedItemIds } from "@/lib/savedFeedItems";

import getFeedComments from "./getFeedComments";

const getFeedItems = async (params?: {
  filterByFollowing?: boolean;
  filterBySaved?: boolean;
}) => {
  const filterByFollowing = params?.filterByFollowing ?? false;
  const filterBySaved = params?.filterBySaved ?? false;
  const currentUserId = await getCurrentUser().then((user) => user.id);
  const followingIds = await getUsersFollowing().then((users) =>
    users.map((user) => user.id)
  );
  const q = query(feedCol, orderBy("timestamp", "desc"));
  const feedSnapshot = await getDocs(q);

  const baseData = await Promise.all(
    feedSnapshot.docs
      .filter(
        (doc) =>
          !filterByFollowing ||
          doc.data().userId === currentUserId ||
          followingIds.includes(doc.data().userId)
      )
      .map(async (doc) => {
        const docId = doc.id;
        const comments = await getFeedComments(docId);
        return {
          id: doc.id,
          ...doc.data(),
          comments,
        };
      })
  );

  if (!filterBySaved) return baseData;

  const savedItemIds = await getSavedItemIds(currentUserId);

  return baseData.filter((post) => savedItemIds.includes(post.id.trim()));

  // return baseData;
};

export default getFeedItems;
