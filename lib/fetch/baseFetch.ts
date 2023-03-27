const baseFetch = async (
  input: RequestInfo | URL,
  init: RequestInit | undefined,
  accessToken: string
) => {
  const res = await fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    let data: unknown;
    try {
      data = (await res.json()) as unknown;
    } catch (e) {
      try {
        data = await res.text();
      } catch (subError) {
        data = e;
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
