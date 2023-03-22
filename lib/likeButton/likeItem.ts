import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import { feedCol } from "@/lib/firestore";

const likeItem = async (userId: string, postId: string) =>
  updateDoc(doc(feedCol, postId), {
    likedIds: arrayUnion(userId),
  });

export default likeItem;
