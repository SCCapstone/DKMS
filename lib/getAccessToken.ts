import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

import { authOptions } from "../pages/api/auth/[...nextauth]";

const getAccessToken = async () => {
  const session = await getSession();

  if (!session) {
    throw new Error("No session");
  }

  return session.accessToken;
};

export const getServerAccessToken = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("No session");
  }

  return session.accessToken;
};

export default getAccessToken;
