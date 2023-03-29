import "server-only";

import getServerAccessToken from "@/lib/getServerAccessToken";

import baseFetch from "./baseFetch";

/**
 * Fetches data and automatically includes a Spotify
 * access token credential. For server use only.
 *
 * @param input URL to fetch
 * @param init optional fetch params
 * @returns Promise of the response body T
 */
const fetchServer = async <T>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => {
  const accessToken = await getServerAccessToken();

  return baseFetch(input, init, accessToken).then(
    (res) => res.json() as Promise<T>
  );
};

export default fetchServer;
