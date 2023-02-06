import { getServerSession } from "next-auth/next";

import { authOptions } from "../../pages/api/auth/[...nextauth]";

import SessionInfo from "./SessionInfo";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("No session");
  }

  return <SessionInfo session={session} />;
};

export default Page;
