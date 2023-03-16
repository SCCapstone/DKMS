import { arrayRemove, doc, increment, updateDoc } from "firebase/firestore";

import { feedCol } from "@/lib//firestore";

const unlikeItem = async (userId: string, postId: string) => {
  await updateDoc(doc(feedCol, postId), {
    likes: increment(-1),
    likedIds: arrayRemove(userId),
  });
};

export default unlikeItem;
