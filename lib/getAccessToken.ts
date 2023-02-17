import "client-only";
import { getSession } from "next-auth/react";

const getAccessToken = async () => {
  const session = await getSession();

  if (!session) {
    throw new Error("No session");
  }

  return session.accessToken;
};

export default getAccessToken;
