import { getServerSession } from "next-auth";

import { authOptions } from "../pages/api/auth/[...nextauth]";

export async function getUser() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("No session");
  }
  return session.user;
}

export async function getUsername() {
  const user = await getUser();
  return user.id;
}
