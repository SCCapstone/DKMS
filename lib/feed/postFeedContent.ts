import { API_URL, getUniqueId } from "./utils";

const postFeedContent = async (username: string, content: string) => {
  // Creating unique document id
  const docID = getUniqueId();

  return fetch(`${API_URL}/${docID}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      fields: {
        username: {
          stringValue: username,
        },
        content: {
          stringValue: content,
        },
      },
    }),
  });
};

export default postFeedContent;
