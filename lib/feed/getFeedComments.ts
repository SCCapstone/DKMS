import { getDocs } from "firebase/firestore";

import { getCommentsCol } from "@/lib/firestore";

const getFeedComments = async (postId: string) => {
  const feedSnapshot = await getDocs(getCommentsCol(postId));
  const baseData = feedSnapshot.docs.map((doc) => ({
    id: doc.id,
    userId: doc.data().userId,
    content: doc.data().content,
    username: doc.data().username,
    likedIds: doc.data().likedIds,
    timestamp: doc.data().timestamp,
  }));

  return baseData
    .sort(
      (a, b) => a.timestamp.getMilliseconds() - b.timestamp.getMilliseconds()
    )
    .reverse();
};

export default getFeedComments;
