import { redirect } from "next/navigation";

/* Fetch for client and server */
const baseFetch = async (
  input: RequestInfo | URL,
  init: RequestInit | undefined,
  accessToken?: string
) => {
  const res = await fetch(input, {
    ...init,
    headers: accessToken
      ? {
          ...init?.headers,
          Authorization: `Bearer ${accessToken}`,
        }
      : init?.headers,
  });
  if (!res.ok) {
    if (res.status === 403) {
      redirect("/auth/signin?error=OAuthSignin");
    }

    if (res.status === 401) {
      redirect("/auth/signin?error=SessionRequired");
    }

    let data: unknown;
    try {
      data = (await res.json()) as unknown;
    } catch (e) {
      try {
        data = await res.text();
      } catch (subError) {
        data = e ?? subError;
      }
    }

    throw new Error(
      `Request failed with status ${res.status}, text ${
        res.statusText
      } and data ${JSON.stringify(data)}`
    );
  }

  return res;
};

export default baseFetch;
