import { doc, deleteDoc } from "firebase/firestore";

import { getCommentsCol, feedCol } from "../firestore";

const deleteFeedItem = async (postId: string, commentId?: string) => {
  if (commentId) {
    await deleteDoc(doc(getCommentsCol(postId), commentId));
  } else {
    await deleteDoc(doc(getCommentsCol(postId)));
    await deleteDoc(doc(feedCol, postId));
  }
};

export default deleteFeedItem;
