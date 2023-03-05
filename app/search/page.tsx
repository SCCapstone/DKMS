import getSpotifyData from "lib/getSpotifyData";

import SearchResults from "./SearchResults";

const getData = async (searchQuery: string | undefined) => {
  if (typeof searchQuery !== "string") {
    return undefined;
  }

  return getSpotifyData<SpotifyApi.SearchResponse>(
    `https://api.spotify.com/v1/search?q=${searchQuery}&type=album,track,artist,playlist&limit=4`
  );
};

const Page = async ({
  searchParams,
}: {
  searchParams: { q: undefined | string };
}) => {
  const results = await getData(searchParams.q);
  return searchParams.q ? <SearchResults results={results} /> : <div />;
};

export default Page;
