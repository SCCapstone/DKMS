import { doc, setDoc, updateDoc } from "firebase/firestore";

import { feedCol, likesCol } from "lib/firestore";

const likeItem = async (
  userId: string,
  postId: string,
  currentLikes: number
) => {
  const newLikes = currentLikes + 1;
  await updateDoc(doc(feedCol, postId), {
    likes: newLikes,
  });

  await setDoc(doc(likesCol(postId), userId), {
    userId,
  });
};

export default likeItem;
