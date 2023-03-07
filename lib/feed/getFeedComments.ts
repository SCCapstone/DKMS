import { getDocs } from "firebase/firestore";

import { getCommentsCol } from "@/lib/firestore";

const getFeedComments = async (postId: string) => {
  const feedSnapshot = await getDocs(getCommentsCol(postId));
  const baseData = feedSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return baseData
    .sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis())
    .reverse();
};

export default getFeedComments;
