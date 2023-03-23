import { getDocs } from "firebase/firestore";

import { feedCol } from "@/lib/firestore";

import getFeedComments from "./getFeedComments";

import type { FeedItemType } from "@/components/feed";

const getFeedItems = async (userId?: string) => {
  const feedSnapshot = await getDocs(feedCol);
  const baseData = await Promise.all(
    feedSnapshot.docs.map(async (doc) => {
      const docId = doc.id;
      const comments = await getFeedComments(docId);
      return {
        id: doc.id,
        userId: doc.data().userId,
        content: doc.data().content,
        likedIds: doc.data().likedIds,
        timestamp: doc.data().timestamp,
        username: doc.data().username,
        comments,
      };
    })
  );

  const formattedData = baseData
    .sort(
      (a, b) => a.timestamp.getMilliseconds() - b.timestamp.getMilliseconds()
    )
    .reverse();

  if (!userId) {
    return formattedData;
  }

  return formattedData.filter((post) => post.userId === userId);
};

export default getFeedItems;
