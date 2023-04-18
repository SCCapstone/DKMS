import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/getUser";

// eslint-disable-next-line import/prefer-default-export
export async function GET(request: Request) {
  const user = await getCurrentUser();
  return NextResponse.redirect(
    new URL(`/app/profile/${user.username}`, request.url)
  );
}
