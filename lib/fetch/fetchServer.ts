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

  const res = await baseFetch(input, init, accessToken);

  try {
    const data = (await res.json()) as T;
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Failed to parse JSON: ${JSON.stringify(err)}`);
    }
    throw new Error("Failed to parse JSON");
  }
};

export default fetchServer;
