import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

import type {
  FirestoreUser,
  FirestoreFeedItem,
  FirestoreProfile,
  FirestoreAccount,
  FirestoreNotification,
  FirestoreFeedCommentItem,
} from "./types";
import type { DocumentData, CollectionReference } from "firebase/firestore";

const firebaseDevConfig = {
  apiKey: "AIzaSyC4iFSz6W7HWZMS9f7ucDq3pdTjv_ftFdo",
  authDomain: "dkms-dev-40360.firebaseapp.com",
  projectId: "dkms-dev-40360",
  storageBucket: "dkms-dev-40360.appspot.com",
  messagingSenderId: "519500986185",
  appId: "1:519500986185:web:ec957a6240f768c7d30c98",
};

const firebaseProdConfig = {
  apiKey: "AIzaSyAdTuRQaAToqGWR-m87i5CLYbACvP_iCB4",
  authDomain: "dkms-prod.firebaseapp.com",
  projectId: "dkms-prod",
  storageBucket: "dkms-prod.appspot.com",
  messagingSenderId: "213938533244",
  appId: "1:213938533244:web:4ab1764b63e2d9e540eaf9",
};

export const firebaseConfig =
  process.env.NODE_ENV === "development"
    ? firebaseDevConfig
    : firebaseProdConfig;

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
const createCollection = <T = DocumentData>(
  collectionName: string,
  ...pathSegments: string[]
) =>
  collection(
    firestore,
    collectionName,
    ...pathSegments
  ) as CollectionReference<T>;

export const usersCol = createCollection<FirestoreUser>("users");
export const accountsCol = createCollection<FirestoreAccount>("accounts");
export const feedCol = createCollection<FirestoreFeedItem>("feed_items");

export const getCommentsCol = (feedId: string) =>
  createCollection<FirestoreFeedCommentItem>("feed_items", feedId, "comments");

export const profilesCol = createCollection<FirestoreProfile>("profiles");

export const notificationsCol =
  createCollection<FirestoreNotification>("notifications");
