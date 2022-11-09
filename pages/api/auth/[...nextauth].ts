import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
    }),
  ],
};

export default NextAuth(authOptions);
