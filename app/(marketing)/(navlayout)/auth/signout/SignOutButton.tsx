"use client";

/* Sign out button */
import { signOut } from "next-auth/react";

const SignOutButton = () => (
  <button
    className="btn btn-ghost bg-spotify text-white"
    type="button"
    onClick={() => void signOut({ callbackUrl: "/" })}
  >
    Sign Out
  </button>
);

export default SignOutButton;
