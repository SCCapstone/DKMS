"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Skeleton from "react-loading-skeleton";

const Page = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (status === "authenticated") {
    router.replace(`/profile/${session.user.username}`);
    return <Skeleton enableAnimation />;
  }

  return <Skeleton enableAnimation />;
};

export default Page;
