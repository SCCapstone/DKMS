import { BASE_URL } from "./utils";

import type { FeedCommentResponse } from "./types";

const getFeedComments = async (docId: string) => {
  const response = await fetch(`${BASE_URL}${docId}/feed_comments`);
  const res = (await response.json()) as FeedCommentResponse;
  if (JSON.stringify(res) === "{}") {
    return [];
  }
  const data = res.documents.map((documents) => ({
    id: documents.name,
    username: documents.fields.username.stringValue,
    comment: documents.fields.comment.stringValue,
    createTime: documents.createTime,
  }));

  return data.sort((a, b) => a.createTime.valueOf() - b.createTime.valueOf());
};

export default getFeedComments;
