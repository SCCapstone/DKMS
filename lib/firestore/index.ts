import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

import type { FirestoreUser, FirestoreFeedContent } from "./types";
import type { DocumentData, CollectionReference } from "firebase/firestore";

export const firebaseConfig = {
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
const firestore = getFirestore(firebaseApp);
export default firestore;

/**
 * A helper to add types to db collections.
 *
 * Code explained / adapted from: https://plainenglish.io/blog/using-firestore-with-typescript-in-the-v9-sdk-cf36851bb099
 * @param collectionName the name of the firestore collection
 * @returns a collection reference with the type of the collection
 * @see https://plainenglish.io/blog/using-firestore-with-typescript-in-the-v9-sdk-cf36851bb099
 *
 */
const createCollection = <T = DocumentData>(collectionName: string) =>
  collection(firestore, collectionName) as CollectionReference<T>;

export const usersCol = createCollection<FirestoreUser>("users");
export const feedCol = createCollection<FirestoreFeedContent>("feed_content");
