import { arrayRemove, doc, updateDoc } from "firebase/firestore";

import { feedCol } from "@/lib//firestore";

const unlikeItem = async (userId: string, postId: string) => {
  await updateDoc(doc(feedCol, postId), {
    likedIds: arrayRemove(userId),
  });
};

export default unlikeItem;
