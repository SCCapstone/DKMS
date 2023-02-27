import getFeedComments from "./getFeedComments";
import { API_URL } from "./utils";

import type { FeedContentResponse } from "./types";
import type { FeedItemContent } from "components/feed/FeedPage";

const getFeedContent = async (username?: string) => {
  const response = await fetch(API_URL);
  const res = (await response.json()) as FeedContentResponse;
  if (JSON.stringify(res) === "{}") {
    return [];
  }
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

export default getFeedContent;
