/* eslint-disable
  no-shadow,
  @typescript-eslint/no-unused-vars,
  @typescript-eslint/consistent-type-definitions */
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

import type { DefaultSession, User } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User extends DefaultSession.user {
    id: string;
    name: string;
    email: string;
    url: string | undefined;
    totalFollowers: number;
    image: string | undefined;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: User;
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
    error?: string;
  }
}
