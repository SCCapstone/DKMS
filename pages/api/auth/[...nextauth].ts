import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

import type { NextAuthOptions } from "next-auth";
import type { SpotifyProfile } from "next-auth/providers/spotify";

type CustomProfile = {
  external_urls: {
    spotify: string;
  };
  followers: {
    total: number;
  };
} & SpotifyProfile;

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider<CustomProfile>({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      profile: (profile) => ({
        id: profile.id,
        name: profile.display_name,
        email: profile.email,
        url: profile.external_urls.spotify,
        totalFollowers: profile.followers.total,
        image: profile.images[0]?.url,
      }),
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => (user ? { ...token, ...user } : token),
    session: ({ session, token }) => ({ ...session, user: token.user }),
  },
};

export default NextAuth(authOptions);
