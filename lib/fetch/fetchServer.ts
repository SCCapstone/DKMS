import "server-only";

import getServerAccessToken from "@/lib/getServerAccessToken";

import baseFetch from "./baseFetch";

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
