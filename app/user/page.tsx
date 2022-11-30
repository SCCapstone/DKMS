import { unstable_getServerSession } from "next-auth/next";

import { authOptions } from "../../pages/api/auth/[...nextauth]";

import UserInfo from "./UserInfo";

const Page = async () => {
  const session = await unstable_getServerSession(authOptions);

  if (!session) {
    throw new Error("No session");
  }

  return <UserInfo user={session.user} />;
};

export default Page;
