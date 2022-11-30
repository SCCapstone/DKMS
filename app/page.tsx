import { unstable_getServerSession } from "next-auth/next";

import Home from "./Home";

const Page = async () => {
  const session = await unstable_getServerSession();

  return <Home user={session!.user!} />;
};

export default Page;
