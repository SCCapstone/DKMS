import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { cert } from "firebase-admin/app";
import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

import baseFetch from "@/lib/fetch/baseFetch";
import { firebaseConfig, profilesCol } from "@/lib/firestore";

import type { NextAuthOptions, EventCallbacks } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { SpotifyProfile } from "next-auth/providers/spotify";

// hard code for now, NextAuth doesn't get the number from Spotify
const EXPIRES_IN = 3000000;

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
const refreshAccessToken = async (token: JWT) => {
  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
    throw new Error("Missing Spotify client ID or secret");
  }

  const url = `https://accounts.spotify.com/api/token?${new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: token.refreshToken,
  }).toString()}`;

  const response = await baseFetch(url, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    method: "POST",
    cache: "no-cache",
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
  };
};

const onSignIn: EventCallbacks["signIn"] = async (message) => {
  const { user, account } = message;

  const accessToken = account?.access_token;
  if (!accessToken) {
    return undefined;
  }

  const artistRes = await baseFetch(
    `https://api.spotify.com/v1/me/top/artists`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  const trackRes = await baseFetch(`https://api.spotify.com/v1/me/top/tracks`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const artistData =
    (await artistRes.json()) as SpotifyApi.UsersTopArtistsResponse;
  const trackData =
    (await trackRes.json()) as SpotifyApi.UsersTopTracksResponse;

  return setDoc(
    doc(profilesCol, user.id),
    {
      topArtists: artistData.items,
      topTracks: trackData.items,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};

const SCOPES = [
  // "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "streaming",
  "playlist-read-private",
  "playlist-read-collaborative",
  // "playlist-modify-private",
  // "playlist-modify-public",
  "user-follow-modify",
  "user-follow-read",
  "user-read-playback-position",
  "user-top-read",
  "user-read-recently-played",
  "user-library-modify",
  "user-library-read",
  "user-read-email",
  "user-read-private",
] as const;

export const authOptions: NextAuthOptions = {
  adapter: FirestoreAdapter({
    ...firebaseConfig,
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
  }),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  providers: [
    SpotifyProvider<SpotifyApi.CurrentUsersProfileResponse & SpotifyProfile>({
      authorization: {
        params: {
          scope: SCOPES.join(" "),
        },
      },
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      profile: (profile: SpotifyApi.CurrentUsersProfileResponse) => ({
        id: profile.id,
        name: profile.display_name ?? profile.id,
        username: profile.id,
        visibility: "public",
        product: profile.product === "premium" ? "premium" : "free",
      }),
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      // Initial sign in
      if (account) {
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
  events: {
    signIn: onSignIn,
  },
};

export default NextAuth(authOptions);
