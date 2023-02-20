/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type {
  FeedComment,
  FeedItemContent,
} from "../../../components/feed/FeedPage";

const api_url =
  "https://firestore.googleapis.com/v1/projects/dkms-spotify/databases/(default)/documents/feed_content";
const base_url = "https://firestore.googleapis.com/v1/";

function uniqueId() {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  return dateString + randomness;
}

export async function postFeedComment(
  docId: string,
  username: string,
  comment: string
) {
  const comment_id = uniqueId();
  const url = base_url.concat(docId, "/feed_comments", comment_id);
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
}

async function getFeedComments(docId: string) {
  let data: FeedComment[];
  const url = base_url.concat(docId, "/", "feed_comments");
  const response = await fetch(url);
  const res = await response.json();
  if (JSON.stringify(res) === "{}") {
    data = [];
  } else {
    data = res.documents.map(
      (document: any) =>
        ({
          id: document.name,
          username: document.fields.username.stringValue,
          comment: document.fields.comment.stringValue,
        } as FeedComment)
    ) as FeedComment[];
  }
  return data;
}

export async function postFeedContent(username: string, content: string) {
  // Creating unique document id
  const docID = uniqueId();
  const url = api_url.concat("/", docID);

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
  let data;
  const response = await fetch(api_url);
  const res = await response.json();
  data = (await Promise.all(
    res.documents.map(
      async (documents: any) =>
        ({
          id: documents.name as string,
          data: {
            username: documents.fields.username.stringValue as string,
            content: documents.fields.content.stringValue as string,
            comments: await getFeedComments(documents.name as string),
          },
        } as FeedItemContent)
    )
  )) as FeedItemContent[];
  if (typeof username === "undefined") {
    return data;
  }
  data = data
    .filter((user) => user.data.username === username)
    .map(
      (user) =>
        ({
          id: user.id,
          data: user.data,
        } as FeedItemContent)
    );
  return data;
}
