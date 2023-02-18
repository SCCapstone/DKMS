import { unstable_getServerSession } from "next-auth";

import { authOptions } from "../pages/api/auth/[...nextauth]";

export default async function getUser() {
  const session = await unstable_getServerSession(authOptions);

  if (!session) {
    throw new Error("No session");
  }
  return session.user.id;
}
