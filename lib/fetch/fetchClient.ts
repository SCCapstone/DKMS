import "client-only";

import getAccessToken from "@/lib/getAccessToken";

import baseFetch from "./baseFetch";

const fetchClient = async <T>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => {
  const accessToken = await getAccessToken();

  return baseFetch(input, init, accessToken).then(
    (res) => res.text() as Promise<T>
  );
};

export default fetchClient;
