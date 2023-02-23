import type {
  FeedComment,
  FeedItemContent,
} from "../../../components/feed/FeedPage";

const api_url =
  "https://firestore.googleapis.com/v1/projects/dkms-spotify/databases/(default)/documents/feed_content";
const base_url = "https://firestore.googleapis.com/v1/";

type FeedCommentDocument = {
  name: string;
  fields: {
    username: {
      stringValue: string;
    };
    comment: {
      stringValue: string;
    };
  };
  createTime: Date;
};

type FeedCommentResponse = {
  documents: FeedCommentDocument[];
};

type FeedContentDocument = {
  name: string;
  fields: {
    username: { stringValue: string };
    content: { stringValue: string };
  };
  createTime: Date;
};

type FeedContentResponse = {
  documents: FeedContentDocument[];
};

const uniqueId = () => {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  return dateString + randomness;
};

const getFeedComments = async (docId: string) => {
  const url = base_url.concat(docId, "/", "feed_comments");
  const response = await fetch(url);
  const res = (await response.json()) as FeedCommentResponse;
  if (JSON.stringify(res) === "{}") {
    return [];
  }
  const baseData = res.documents.map((documents) => ({
    id: documents.name,
    username: documents.fields.username.stringValue,
    comment: documents.fields.comment.stringValue,
    createTime: documents.createTime,
  }));

  const formattedData = baseData.sort(
    (a, b) => a.createTime.valueOf() - b.createTime.valueOf()
  );
  return formattedData;
};

export const postFeedComment = async (
  docId: string,
  username: string,
  comment: string
) => {
  const comment_id = uniqueId();
  const url = base_url.concat(docId, "/feed_comments/", comment_id);
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

export const postFeedContent = async (username: string, content: string) => {
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
};

export const getFeedContent = async (username?: string) => {
  const response = await fetch(api_url);
  const res = (await response.json()) as FeedContentResponse;
  const baseData = await Promise.all(
    res.documents.map(async (documents) => ({
      id: documents.name,
      data: {
        username: documents.fields.username.stringValue,
        content: documents.fields.content.stringValue,
        comments: await getFeedComments(documents.name),
        createTime: documents.createTime,
      },
    }))
  );

  const formattedData = baseData
    .sort((a, b) => a.data.createTime.valueOf() - b.data.createTime.valueOf())
    .reverse();

  if (!username) {
    return formattedData;
  }
  return formattedData
    .filter((user) => user.data.username === username)
    .map(
      (user) =>
        ({
          id: user.id,
          data: user.data,
        } as FeedItemContent)
    );
};
