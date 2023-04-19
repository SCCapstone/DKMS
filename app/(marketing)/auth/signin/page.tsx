import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import SignInButton from "./SignInButton";

import type { SignInErrorTypes } from "next-auth/core/pages/signin";

const ERROR_DESCRIPTIONS = {
  Signin:
    "DKMS is currently in closed beta and your account has not yet been authorized. To use DKMS, please switch to an authorized account or contact the developers.",
  OAuthSignin:
    "DKMS is currently in closed beta and your account has not yet been authorized. To use DKMS, please switch to an authorized account or contact the developers.",
  OAuthCallback:
    "DKMS is currently in closed beta and your account has not yet been authorized. To use DKMS, please switch to an authorized account or contact the developers.",
  OAuthCreateAccount:
    "DKMS is currently in closed beta and your account has not yet been authorized. To use DKMS, please switch to an authorized account or contact the developers.",
  EmailCreateAccount:
    "DKMS is currently in closed beta and your account has not yet been authorized. To use DKMS, please switch to an authorized account or contact the developers.",
  Callback:
    "DKMS is currently in closed beta and your account has not yet been authorized. To use DKMS, please switch to an authorized account or contact the developers.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "The e-mail could not be sent.",
  CredentialsSignin:
    "Sign in failed. Check the details you provided are correct.",
  SessionRequired: "Please sign in to access this page.",
  default:
    "DKMS is currently in closed beta and your account has not yet been authorized. To use DKMS, please switch to an authorized account or contact the developers.",
} as const;

const SignInPage = async ({
  searchParams,
}: {
  searchParams: { callbackUrl?: string; error?: SignInErrorTypes };
}) => {
  const { callbackUrl, error: errorType } = searchParams;
  const session = await getServerSession(authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session && !errorType) {
    redirect(callbackUrl ?? "/app");
  }

  const errorText = errorType ? ERROR_DESCRIPTIONS[errorType] : undefined;

  return (
    <div className="min-h-screen px-10 pt-5">
      <h2 className="text-2xl font-bold py-3">Sign In</h2>
      <span className="divider mt-0" />

      {errorText && (
        <div className="alert alert-warning shadow-lg mb-4">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="whitespace-pre-line">{errorText}</span>
          </div>
        </div>
      )}
      <SignInButton />
    </div>
  );
};

export default SignInPage;
