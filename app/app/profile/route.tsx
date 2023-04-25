import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/getUser";

import type { NextRequest } from "next/server";

/* Routing for profile page */
// eslint-disable-next-line import/prefer-default-export
export async function GET(request: NextRequest) {
  /**  For local production builds using `next start`,
   * the `request.nextUrl.origin` will be `0.0.0.0`, which
   * is not a valid domain. We need to replace it with `localhost`.
   */
  const baseUrl = request.nextUrl.origin.replace("0.0.0.0", "localhost");

  const user = await getCurrentUser();

  return NextResponse.redirect(
    new URL(`/app/profile/${user.username}`, baseUrl)
  );
}
