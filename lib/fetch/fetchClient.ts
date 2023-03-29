import "client-only";

import getAccessToken from "@/lib/getAccessToken";

import baseFetch from "./baseFetch";

type ClientRequestInit = RequestInit & {
  method: "PUT" | "PATCH" | "DELETE";
};

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
