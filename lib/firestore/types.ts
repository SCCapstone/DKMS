import type { Timestamp } from "firebase/firestore";
import type { User } from "next-auth";

export type FirestoreUser = User;

export type FirestoreFeedItem = {
  timestamp: Date;
  userId: string;
  content: string;
  username: string;
  likedIds: string[];
};

export type FirestoreProfile = {
  topTracks: SpotifyApi.TrackObjectFull[];
  topArtists: SpotifyApi.ArtistObjectFull[];
  updatedAt: Timestamp;
};
