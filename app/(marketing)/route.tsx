import { NextResponse } from "next/server";

// eslint-disable-next-line import/prefer-default-export
export function GET() {
  if (!process.env.NEXTAUTH_URL) {
    throw new Error("NEXTAUTH_URL is not defined");
  }

  return NextResponse.redirect(new URL("/app", process.env.NEXTAUTH_URL));
}
