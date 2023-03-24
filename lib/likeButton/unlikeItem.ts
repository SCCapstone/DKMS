import { arrayRemove, doc, updateDoc } from "firebase/firestore";

import { feedCol } from "@/lib//firestore";

import deleteNotifications from "../notifications/deleteNotifications";

const unlikeItem = async (userId: string, postId: string) => {
  await updateDoc(doc(feedCol, postId), {
    likedIds: arrayRemove(userId),
  });

  await deleteNotifications({ postId });
};

export default unlikeItem;
