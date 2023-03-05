import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

import type { FirestoreUser, FirestoreFeedContent } from "./types";
import type { DocumentData, CollectionReference } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4I6SntGUr8boAz8_UsIhoWspRrjMWuxY",
  authDomain: "dkms-spotify.firebaseapp.com",
  projectId: "dkms-spotify",
  storageBucket: "dkms-spotify.appspot.com",
  messagingSenderId: "183020545123",
  appId: "1:183020545123:web:457c0adaf0c3855b510456",
  measurementId: "G-GDN3X0HN0L",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseApp);

// This is just a helper to add the type to the db responses
const createCollection = <T = DocumentData>(collectionName: string) =>
  collection(firestore, collectionName) as CollectionReference<T>;

export const usersCol = createCollection<FirestoreUser>("known_users");
export const feedCol = createCollection<FirestoreFeedContent>("feed_content");
