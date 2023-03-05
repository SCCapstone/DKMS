export type FirestoreUser = {
  name: string;
  email: string;
};

export type FirestoreFeedComment = {
  comment: string;
  username: string;
};

export type FirestoreFeedContent = {
  content: string;
  username: string;
  comments?: FirestoreFeedComment[];
};
