import { arrayUnion, doc, increment, updateDoc } from "firebase/firestore";

import { feedCol } from "@/lib/firestore";

const likeItem = async (userId: string, postId: string) => {
  await updateDoc(doc(feedCol, postId), {
    likes: increment(1),
    likedIds: arrayUnion(userId),
  });
};

export default likeItem;
