import { NextResponse } from "next/server";

// eslint-disable-next-line import/prefer-default-export
export function GET(request: Request) {
  return NextResponse.redirect(new URL("/app", request.url));
}
