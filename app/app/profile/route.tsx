import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/getUser";

// eslint-disable-next-line import/prefer-default-export
export async function GET() {
  const user = await getCurrentUser();

  if (!process.env.NEXTAUTH_URL && !process.env.NEXT_PUBLIC_VERCEL_URL) {
    throw new Error("No base url defined");
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.NEXTAUTH_URL;

  return NextResponse.redirect(
    new URL(`/app/profile/${user.username}`, baseUrl)
  );
}
