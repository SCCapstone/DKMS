import { unstable_getServerSession } from "next-auth/next";

import { authOptions } from "../pages/api/auth/[...nextauth]";

import Home from "./Home";

const Page = async () => {
  const session = await unstable_getServerSession(authOptions);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return <Home user={session!.user} />;
};

export default Page;
