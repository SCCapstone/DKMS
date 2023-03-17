import { doc, deleteDoc } from "firebase/firestore";

import { feedCol } from "../firestore";

import type { FeedCommentType, FeedItemType } from "@/components/feed";

const deleteFeedItem = async (
  postData: FeedItemType,
  commentData?: FeedCommentType
) => {
  if (typeof commentData !== "undefined") {
    await deleteDoc(doc(feedCol, postData.id, "comments", commentData.id));
  } else {
    await deleteDoc(doc(feedCol, postData.id));
  }
};

export default deleteFeedItem;
