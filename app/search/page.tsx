import { Suspense } from "react";

import getSpotifyData from "lib/getSpotifyData";

import SearchMenu from "./SearchMenu";
import SearchResults from "./SearchResults";

const getData = async (searchQuery: string) =>
  getSpotifyData<SpotifyApi.SearchResponse>(
    `https://api.spotify.com/v1/search?q=${searchQuery}&type=album,track,artist&limit=4`
  );

const Page = () => {
  const resultsPromise = getData("raye");
  return (
    <div>
      <SearchMenu />
      <Suspense fallback={<p>Loading feed...</p>}>
        {/* @ts-expect-error To fix TS error for async functions */}
        <SearchResults resultsPromise={resultsPromise} />
      </Suspense>
    </div>
  );
};

export default Page;
