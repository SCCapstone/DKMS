"use client";

/* Sign in button to direct to Spotify sign in page */

import { signIn } from "next-auth/react";

const SignInButton = () => (
  <button
    className="btn btn-ghost bg-spotify text-white"
    type="button"
    onClick={() => void signIn("spotify")}
  >
    Sign in with Spotify
  </button>
);

export default SignInButton;
