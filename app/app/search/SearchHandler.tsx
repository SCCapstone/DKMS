"use client";

import { useSearchParams } from "next/navigation";

import SearchMenu from "./SearchMenu";

const SearchHandler = () => {
  const searchParams = useSearchParams();

  const searchQuery = searchParams?.get("q");

  return <SearchMenu query={searchQuery ?? ""} />;
};

export default SearchHandler;
