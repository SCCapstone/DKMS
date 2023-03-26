import { addDoc, serverTimestamp } from "firebase/firestore";

import { feedCol } from "@/lib/firestore";

import type { sharedItemType } from "../firestore/types";
import type { User } from "next-auth";

const postFeedItem = async (
  user: User,
  content: string,
  item?: sharedItemType
) => {
  const docRef = await addDoc(feedCol, {
    item,
    content,
    userId: user.id,
    username: user.username,
    timestamp: serverTimestamp(),
    likedIds: [],
  });

  return docRef.id;
};

export default postFeedItem;
