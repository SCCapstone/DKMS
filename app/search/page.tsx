import { getDocs, query, where } from "firebase/firestore";

import { usersCol } from "lib/firestore";
import getSpotifyData from "lib/getSpotifyData";

import SearchResults from "./SearchResults";

const searchFirebase = async (searchQuery: string) => {
  const q = query(
    usersCol,
    where("name", ">=", searchQuery),
    where("name", "<=", `${searchQuery}\uf8ff`)
  );

  const usersSnapshot = await getDocs(q);
  return usersSnapshot.docs.map((doc) => doc.data());
};
const searchSpotify = async (searchQuery: string) =>
  getSpotifyData<SpotifyApi.SearchResponse>(
    `https://api.spotify.com/v1/search?q=${searchQuery}&type=album,track,artist,playlist&limit=4`
  );

const getData = async (searchQuery: string | undefined) => {
  if (typeof searchQuery !== "string") {
    return undefined;
  }
  const spotifyResults = await searchSpotify(searchQuery);
  const firebaseResults = await searchFirebase(searchQuery);

  return { ...spotifyResults, users: firebaseResults };
};

const Page = async ({
  searchParams,
}: {
  searchParams: { q: undefined | string };
}) => {
  const results = await getData(searchParams.q);

  return searchParams.q ? (
    <SearchResults results={results} />
  ) : (
    <div>{JSON.stringify(searchParams)}</div>
  );
};

export default Page;

// see:
// https://beta.nextjs.org/docs/api-reference/file-conventions/page#searchparams-optional
export const dynamic = "force-dynamic";
