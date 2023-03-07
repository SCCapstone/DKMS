import type { Timestamp } from "firebase/firestore";
import type { User } from "next-auth";

export type FirestoreUser = User;

export type FirestoreFeedItem = {
  timestamp: Timestamp;
  userId: string;
  content: string;
  likes: number;
  username: string;
};

export type FirestoreProfile = {
  topTracks: string[];
  topArtists: string[];
  updatedAt: Timestamp;
};
