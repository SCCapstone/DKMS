import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import SignOutButton from "./SignOutButton";

const SignOutPage = async () => {
  const session = await getServerSession(authOptions);

  // If the user is already logged out, redirect.
  if (!session) {
    redirect("/");
  }

  return (
    <>
      <h2 className="text-2xl font-bold py-3">Sign Out</h2>
      <span className="divider mt-0" />

      <SignOutButton />
    </>
  );
};

export default SignOutPage;
