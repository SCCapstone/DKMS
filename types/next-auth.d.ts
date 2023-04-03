/* eslint-disable @typescript-eslint/consistent-type-definitions */

import type {
  DefaultSession,
  DefaultUser,
  User as NextAuthUser,
} from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User extends DefaultUser {
    /**
     * The ID used on the firestore database
     */
    id: string;
    /**
     * The display name of the user — defaults to Spotify's username,
     * but can be changed by the user in their DKMS settings (eventually)
     */
    name: string;
    /**
     * The Spotify username of the user — use for API calls
     */
    username: string;
    /**
     * The privacy settings of the user — should they
     * be hidden from search + global feed?
     */
    visibility: "public" | "private";
    /**
     * The Spotify product of the user — free or premium
     * (used for determining if they can manage playback)
     */
    product: "free" | "premium";
  }

  interface Session extends DefaultSession {
    user: User;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: NextAuthUser;
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
    error?: string;
  }
}
