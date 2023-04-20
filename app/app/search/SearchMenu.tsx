"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

const MAX_SEARCH_LENGTH = 50;

const SearchMenu = () => {
  const searchParams = useSearchParams();

  const searchQuery = searchParams?.get("q");

  const router = useRouter();
  const [searchText, setSearchText] = useState(searchQuery ?? "");
  const [isPending, startTransition] = useTransition();

  const handleSearch = () => {
    startTransition(() => {
      router.replace(`/app/search?q=${searchText}`);
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (searchText !== searchQuery) {
      handleSearch();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchText !== searchQuery) {
        handleSearch();
      }
    }
  };
  return (
    <div className="form-control">
      <div className="input-group">
        <input
          type="text"
          placeholder="Search…"
          className="input input-bordered"
          value={searchText}
          maxLength={MAX_SEARCH_LENGTH}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleClick}
          disabled={!searchText || isPending || searchQuery === searchText}
          type="submit"
          className={`${isPending ? "loading" : ""} btn btn-primary`}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchMenu;
