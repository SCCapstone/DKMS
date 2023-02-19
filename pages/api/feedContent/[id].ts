import type {
  FeedItemContent,
  FeedComment,
} from "../../../components/feed/FeedPage";

const api_url =
  "https://firestore.googleapis.com/v1/projects/dkms-spotify/databases/(default)/documents/feed_content";

function uniqueId() {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  return dateString + randomness;
}

async function getFeedComments(docId: string) {
  const base_url = "https://firestore.googleapis.com/v1/";
  const url = base_url.concat(docId, "/", "feed_comments");
  const response: Response = await fetch(url);
  const res: JSON = (await response.json()) as JSON;
  const data = res.documents.map(
    (document: any) =>
      ({
        id: document.name,
        username: document.fields.username.stringValue,
        comment: document.fields.comment.stringValue,
      } as FeedComment)
  ) as FeedComment[];
  return data;
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
  const res: JSON = (await response.json()) as JSON;
  // Convert JSON to feed item content
  let data = res.documents.map(
    async (documents: JSON) =>
      ({
        id: documents.name as string,
        data: {
          username: documents.fields.username.stringValue as string,
          content: documents.fields.content.stringValue as string,
          comments: await getFeedComments(documents.name as string),
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
