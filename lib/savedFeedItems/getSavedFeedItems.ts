import { getDocs } from "firebase/firestore";

import getFeedComments from "@/lib/feed/getFeedComments";
import { feedCol } from "@/lib/firestore";

import getSavedFeedItemsList from "./getSavedFeedItemsList";

const getSavedFeedItems = async (userId: string) => {
  const savedItemIds = await getSavedFeedItemsList(userId);

  const feedSnapshot = await getDocs(feedCol);
  const baseData = await Promise.all(
    feedSnapshot.docs.map(async (docSnap) => {
      const docId = docSnap.id;
      const comments = await getFeedComments(docId);
      return {
        id: docSnap.id,
        ...docSnap.data(),
        comments,
      };
    })
  );

  const formattedData = baseData
    .sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis())
    .reverse();

  return formattedData.filter((post) => savedItemIds?.includes(post.id.trim()));
};

export default getSavedFeedItems;
