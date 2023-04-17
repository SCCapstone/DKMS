import type { MusicItemTypes } from "@/lib/feed/postFeedItem";
import type { Timestamp } from "firebase/firestore";
import type { Account, User } from "next-auth";

export type FirestoreUser = User;

export type FirestoreAccount = Account;

export type FirestoreFeedItem = {
  musicItemId?: string | undefined;
  musicItemType?: MusicItemTypes | undefined;
  timestamp: Timestamp;
  userId: string;
  content: string;
  username: string;
  likedIds: string[];
};

export type FirestoreFeedCommentItem = {
  timestamp: Timestamp;
  userId: string;
  content: string;
  username: string;
};

export type FirestoreProfile = {
  topTracks: SpotifyApi.TrackObjectFull[];
  topArtists: SpotifyApi.ArtistObjectFull[];
  updatedAt: Timestamp;
  savedItemIds: string[] | undefined;
};

export type FirestoreNotification = {
  feedId: string;
  commentId?: string;
  /** The user to notify */
  recipientId: string;
  /** The user who sent the notification */
  username: string;
  timestamp: Timestamp;
  type: "comment" | "like";
  body: string;
};
