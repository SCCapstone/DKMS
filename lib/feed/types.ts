export type FeedCommentDocument = {
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

export type FeedCommentResponse = {
  documents: FeedCommentDocument[];
};

export type FeedContentDocument = {
  name: string;
  fields: {
    username: { stringValue: string };
    content: { stringValue: string };
  };
  createTime: Date;
};

export type FeedContentResponse = {
  documents: FeedContentDocument[];
};
