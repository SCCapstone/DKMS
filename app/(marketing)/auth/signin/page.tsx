import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";

import SignInButton from "./SignInButton";

import type { SignInErrorTypes } from "next-auth/core/pages/signin";

const ERROR_DESCRIPTIONS = {
  Signin:
    "DKMS is currently in closed beta. To request access to our service, please contact the developers.",
  OAuthSignin:
    "DKMS is currently in closed beta. To request access to our service, please contact the developers.",
  OAuthCallback:
    "DKMS is currently in closed beta. To request access to our service, please contact the developers.",
  OAuthCreateAccount:
    "DKMS is currently in closed beta. To request access to our service, please contact the developers.",
  EmailCreateAccount:
    "DKMS is currently in closed beta. To request access to our service, please contact the developers.",
  Callback:
    "DKMS is currently in closed beta. To request access to our service, please contact the developers.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "The e-mail could not be sent.",
  CredentialsSignin:
    "Sign in failed. Check the details you provided are correct.",
  SessionRequired: "Please sign in to access this page.",
  default:
    "DKMS is currently in closed beta. To request access to our service, please contact the developers.",
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
  if (session) {
    redirect(callbackUrl ?? "/app");
  }

  const errorText = errorType ? ERROR_DESCRIPTIONS[errorType] : undefined;

  return (
    <div>
      <h1>Sign In</h1>
      {errorText && <p>{errorText}</p>}
      <SignInButton />
    </div>
  );
};

export default SignInPage;
