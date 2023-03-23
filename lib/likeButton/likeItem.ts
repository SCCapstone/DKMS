import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import { feedCol } from "@/lib/firestore";
import dispatchNotification from "@/lib/notifications/dispatchNotification";

const likeItem = async (userId: string, postId: string, username: string) => {
  await updateDoc(doc(feedCol, postId), {
    likedIds: arrayUnion(userId),
  });

  await dispatchNotification({
    feedId: postId,
    username,
    type: "like",
  });
};

export default likeItem;
