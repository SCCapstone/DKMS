import { getDocs } from "firebase/firestore";

import { feedCol } from "lib/firestore";

import getFeedComments from "./getFeedComments";

const getFeedItems = async (userId?: string) => {
  const feedSnapshot = await getDocs(feedCol);
  const baseData = await Promise.all(
    feedSnapshot.docs.map(async (doc) => {
      const docId = doc.id;
      const comments = await getFeedComments(docId);
      return {
        id: doc.id,
        ...doc.data(),
        comments,
      };
    })
  );

  const formattedData = baseData
    .sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis())
    .reverse();

  if (!userId) {
    return formattedData;
  }

  return formattedData.filter((post) => post.userId === userId);
};

export default getFeedItems;
