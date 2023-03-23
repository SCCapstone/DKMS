import { getDocs, query, where } from "firebase/firestore";
import { getServerSession } from "next-auth";
import "server-only";

import { accountsCol } from "@/lib/firestore";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

/**
 * Matches a Firestore user ID to a Spotify username.
 *
 * @param userId the Firestore user ID to search for
 * @returns the Spotify username of the user with the given ID, or undefined if no user is found
 */
export const getUsernameFromId = async (userId: string) => {
  const q = query(accountsCol, where("userId", "==", userId));

  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    return undefined;
  }
  return snapshot.docs[0].data().username;
};

/**
 * Matches a Spotify username to a Firestore user ID.
 *
 * @param username the Spotify username to search for
 * @returns the Firestore user ID of the user with the given username, or undefined if no user is found
 */
export const getIdFromUsername = async (username: string) => {
  const q = query(accountsCol, where("providerAccountId", "==", username));

  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    return undefined;
  }
  return snapshot.docs[0].data().userId;
};

/**
 * Returns the currently logged in user, according to
 * next-auth's session.
 *
 * @returns The currently logged in user
 * @throws Error if no user is logged in or no session is found
 */
export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("No session");
  }
  return session.user;
};
