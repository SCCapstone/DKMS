import { BASE_URL, getUniqueId } from "./utils";

const postFeedComment = async (
  docId: string,
  username: string,
  comment: string
) => {
  const comment_id = getUniqueId();
  const url = `${BASE_URL}${docId}/feed_comments/${comment_id}`;
  await fetch(url, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      fields: {
        username: {
          stringValue: username,
        },
        comment: {
          stringValue: comment,
        },
      },
    }),
  });
};
export default postFeedComment;
