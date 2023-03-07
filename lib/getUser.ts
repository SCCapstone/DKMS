import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import "server-only";

import { usersCol } from "@/lib/firestore";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

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

/**
 * Returns the user with the given username from firestore.
 *
 * @param username The username to search for
 * @returns The user with the given username, or undefined if no user is found
 */
export const getUserByUsername = async (username: string) => {
  const usersSnapshot = await getDocs(usersCol);
  const usersData = usersSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return usersData.find((user) =>
    user.username.toLowerCase().includes(username.toLowerCase())
  );
};

/**
 * Returns the user with the given id from firestore.
 *
 * @param id The id to search for
 * @returns The user with the given id, or undefined if no user is found
 */
export const getUserById = async (id: string) => {
  const usersSnapshot = await getDocs(usersCol);
  const usersData = usersSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return usersData.find((user) => user.id === id);
};
