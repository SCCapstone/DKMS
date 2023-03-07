import "client-only";

import getAccessToken from "@/lib/getAccessToken";

const putSpotifyData = async (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => {
  const accessToken = await getAccessToken();

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
};

export default putSpotifyData;
