import { doc, getDoc, getDocs } from "firebase/firestore";

import { getFeedComments } from "@/lib/feed";
import { feedCol, profilesCol } from "@/lib/firestore";

const getSavedFeedItems = async (userId: string) => {
  const docRef = doc(profilesCol, userId);
  const profile = await getDoc(docRef);
  const savedItemIds = profile.data()?.savedItemIds;

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

  return formattedData.filter((post) => {
    const itemId = savedItemIds?.find((item) => item.trim() === post.id);
    return post.id === itemId?.trim();
  });
};

export default getSavedFeedItems;
