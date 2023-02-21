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
}

async function getFeedComments(docId: string) {
  let data: FeedComment[];
  const url = base_url.concat(docId, "/", "feed_comments");
  const response = await fetch(url);
  const res: FeedCommentResponse =
    (await response.json()) as FeedCommentResponse;
  if (JSON.stringify(res) === "{}") {
    data = [];
  } else {
    data = res.documents.map((documents: FeedCommentDocument) => ({
      id: documents.name,
      username: documents.fields.username.stringValue,
      comment: documents.fields.comment.stringValue,
      createTime: documents.createTime,
    }));

    data = data.sort((a, b) => a.createTime.valueOf() - b.createTime.valueOf());
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
  let data: FeedItemContent[];
  const response = await fetch(api_url);
  const res: FeedContentResponse =
    (await response.json()) as FeedContentResponse;
  data = await Promise.all(
    res.documents.map(async (documents: FeedContentDocument) => ({
      id: documents.name,
      data: {
        username: documents.fields.username.stringValue,
        content: documents.fields.content.stringValue,
        comments: await getFeedComments(documents.name),
        createTime: documents.createTime,
      },
    }))
  );

  data = data.sort(
    (a, b) => a.data.createTime.valueOf() - b.data.createTime.valueOf()
  );
  data = data.reverse();

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
