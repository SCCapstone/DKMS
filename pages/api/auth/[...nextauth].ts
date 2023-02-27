import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { SpotifyProfile } from "next-auth/providers/spotify";

// hard code for now, NextAuth doesn't get the number from Spotify
const EXPIRES_IN = 3600000;

type CustomProfile = {
  external_urls: {
    spotify: string;
  };
  followers: {
    total: number;
  };
} & SpotifyProfile;

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
const refreshAccessToken = async (token: JWT) => {
  try {
    if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
      throw new Error("Missing Spotify client ID or secret");
    }

    const url = `https://accounts.spotify.com/api/token?${new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    }).toString()}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      method: "POST",
    });

    const refreshedTokens = (await response.json()) as {
      access_token: string;
      token_type: "Bearer";
      scope: string;
      expires_in: number;
    };

    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + EXPIRES_IN,
      refreshToken: token.refreshToken,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider<CustomProfile>({
      authorization:
        "https://accounts.spotify.com/authorize?scope=ugc-image-upload%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private%20user-follow-modify%20playlist-read-collaborative%20user-follow-read%20user-read-currently-playing%20user-read-playback-position%20user-library-modify%20playlist-modify-private%20playlist-modify-public%20user-read-email%20user-top-read%20streaming%20user-read-recently-played%20user-read-private%20user-library-read",
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
    jwt: async ({ token, user, account }) => {
      // Initial sign in
      if (account && user) {
        if (!account.refresh_token || !account.access_token) {
          throw new Error("No refresh token or access token");
        }

        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + EXPIRES_IN,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    session: ({ session, token }) => ({
      ...session,
      user: token.user,
      accessToken: token.accessToken,
      error: token.error,
    }),
  },
};

export default NextAuth(authOptions);
