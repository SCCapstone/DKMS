import type { User } from "next-auth";

export type FirestoreUser = User;

export type FirestoreFeedComment = {
  comment: string;
  username: string;
};

export type FirestoreFeedContent = {
  content: string;
  username: string;
  comments?: FirestoreFeedComment[];
};
