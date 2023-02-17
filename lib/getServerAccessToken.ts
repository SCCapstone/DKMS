import { getServerSession } from "next-auth";
import "server-only";

import { authOptions } from "../pages/api/auth/[...nextauth]";

const getServerAccessToken = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("No session");
  }

  return session.accessToken;
};

export default getServerAccessToken;
