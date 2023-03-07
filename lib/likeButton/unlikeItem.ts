import { deleteDoc, doc, updateDoc } from "firebase/firestore";

import { feedCol, likesCol } from "lib/firestore";

const unlikeItem = async (
  userId: string,
  postId: string,
  currentLikes: number
) => {
  const newLikes = currentLikes - 1;
  await updateDoc(doc(feedCol, postId), {
    likes: newLikes,
  });

  await deleteDoc(doc(likesCol(postId), userId));
};

export default unlikeItem;
