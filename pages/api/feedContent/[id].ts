/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { FeedItemContent } from "../../../components/feed/FeedPage";

const api_url =
  "https://firestore.googleapis.com/v1/projects/dkms-spotify/databases/(default)/documents/feed_content";

function uniqueId() {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  return dateString + randomness;
}

export async function postFeedContent(username: string, content: string) {
  // Creating unique document id
  const docID = uniqueId();
  const url = api_url.concat("/", docID);

  // Creating response body for feed item
  await fetch(url, {
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
}

export async function getFeedContent(username?: string) {
  // Fetch all feed items
  const response = await fetch(api_url);
  const res = await response.json();
  // Convert JSON to feed item content
  let data = res.documents.map(
    (documents: any) =>
      ({
        id: documents.name as string,
        data: {
          username: documents.fields.username.stringValue as string,
          content: documents.fields.content.stringValue as string,
        },
      } as FeedItemContent)
  ) as FeedItemContent[];
  if (typeof username !== "undefined") {
    data = data
      .filter((user) => user.data.username === username)
      .map(
        (user) =>
          ({
            id: user.id,
            data: user.data,
          } as FeedItemContent)
      );
  }
  return data;
}
