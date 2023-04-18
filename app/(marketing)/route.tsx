import { NextResponse } from "next/server";

// eslint-disable-next-line import/prefer-default-export
export function GET() {
  if (!process.env.NEXTAUTH_URL && !process.env.NEXT_PUBLIC_VERCEL_URL) {
    throw new Error("No base url defined");
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.NEXTAUTH_URL;

  return NextResponse.redirect(new URL("/app", baseUrl));
}
