/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line import/no-unresolved
import getSpotifyData from "lib/getSpotifyData";

import SearchResults from "./SearchResults";

const getData = async (searchQuery: string) =>
  getSpotifyData<SpotifyApi.SearchResponse>(
    `https://api.spotify.com/v1/search?q=${searchQuery}&type=album,track,artist&limit=4`
  );

const Page = async ({ params }: { params: { searchQuery: string } }) => {
  const results = await getData(params.searchQuery);
  return <SearchResults results={results} />;
};

export default Page;
