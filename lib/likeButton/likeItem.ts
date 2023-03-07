import { doc, updateDoc } from "firebase/firestore";

import firestore from "lib/firestore";

const likeItem = async (postId: string, currentLikes: number) => {
  const newLikes = currentLikes + 1;
  const docRef = await updateDoc(doc(firestore, "feed_items", postId), {
    likes: newLikes,
  });

  return docRef;
};

export default likeItem;
