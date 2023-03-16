import { doc, getDoc } from "firebase/firestore";

import { feedCol } from "@/lib/firestore";

const isItemLiked = async (userId: string, postId: string) => {
  const docRef = doc(feedCol, postId);
  const docSnap = await getDoc(docRef);

  return docSnap.data()?.likedIds.includes(userId);
};

export default isItemLiked;
