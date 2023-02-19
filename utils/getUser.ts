import { getServerSession } from "next-auth";

import { authOptions } from "../pages/api/auth/[...nextauth]";

import type { User, Session } from "next-auth";

export async function getUser() {
  const session: Session = (await getServerSession(authOptions)) as Session;

  if (!session) {
    throw new Error("No session");
  }
  return session.user;
}

export async function getUsername() {
  const user: User = await getUser();
  return user.id;
}
