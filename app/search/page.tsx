import { getDocs } from "firebase/firestore";

import fetchServer from "@/lib/fetch/fetchServer";
import { usersCol } from "@/lib/firestore";

import SearchResults from "./SearchResults";

const searchFirebase = async (searchQuery: string) => {
  const usersSnapshot = await getDocs(usersCol);
  const usersData = usersSnapshot.docs.map((doc) => doc.data());

  return usersData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
};
const searchSpotify = async (searchQuery: string) =>
  fetchServer<SpotifyApi.SearchResponse>(
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

  return searchParams.q ? <SearchResults results={results} /> : null;
};

export default Page;

// see:
// https://beta.nextjs.org/docs/api-reference/file-conventions/page#searchparams-optional
export const dynamic = "force-dynamic";
