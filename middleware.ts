import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) =>
      !!token && token.error !== "RefreshAccessTokenError",
  },
});

export const config = { matcher: ["/app:path*"] };
