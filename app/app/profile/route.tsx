import { NextResponse } from "next/server";
import { useSession } from "next-auth/react";

import type { NextRequest } from "next/server";

// eslint-disable-next-line import/prefer-default-export
export function GET(request: NextRequest) {
  /**  For local production builds using `next start`,
   * the `request.nextUrl.origin` will be `0.0.0.0`, which
   * is not a valid domain. We need to replace it with `localhost`.
   */
  const baseUrl = request.nextUrl.origin.replace("0.0.0.0", "localhost");

  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return NextResponse.redirect(
      new URL(`/app/profile/${session.user.username}`, baseUrl)
    );
  }
}
