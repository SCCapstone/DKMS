import "server-only";

import getServerAccessToken from "@/lib/getServerAccessToken";

const getSpotifyData = async <T>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => {
  const accessToken = await getServerAccessToken();

  const res = await fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const { error } = (await res.json()) as { error: SpotifyApi.ErrorObject };
    throw new Error(`${error.status}: ${error.message}`);
  }

  return res.json() as Promise<T>;
};

export default getSpotifyData;
