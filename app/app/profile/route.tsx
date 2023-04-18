import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/getUser";

// eslint-disable-next-line import/prefer-default-export
export async function GET() {
  const user = await getCurrentUser();
  if (!process.env.NEXTAUTH_URL) {
    throw new Error("NEXTAUTH_URL is not defined");
  }

  return NextResponse.redirect(
    new URL(`/app/profile/${user.username}`, process.env.NEXTAUTH_URL)
  );
}
