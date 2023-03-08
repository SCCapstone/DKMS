import { doc, getDoc } from "firebase/firestore";

import { likesCol } from "@/lib/firestore";

const isItemLiked = async (userId: string, postId: string) => {
  const docRef = doc(likesCol(postId), userId);
  const docSnap = await getDoc(docRef);

  return docSnap.exists();
};

export default isItemLiked;
