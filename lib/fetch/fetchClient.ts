import "client-only";

import getAccessToken from "@/lib/getAccessToken";

import baseFetch from "./baseFetch";

type ClientRequestInit = RequestInit & {
  method: "PUT" | "PATCH" | "DELETE";
};

/**
 * Fetches data and automatically includes a Spotify
 * access token credential. For client use only.
 * Fetching on the client can only use the
 * methods PUT, PATCH, and DELETE and must
 * explicitly declare one
 *
 * @param input URL to fetch
 * @param init fetch params
 * @returns Promise of the response body T
 */
const fetchClient = async <T>(
  input: RequestInfo | URL,
  init: ClientRequestInit
) => {
  const accessToken = await getAccessToken();

  return baseFetch(input, init, accessToken).then(
    (res) => res.text() as Promise<T>
  );
};

export default fetchClient;
