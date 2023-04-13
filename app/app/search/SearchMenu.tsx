"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

const SearchMenu = () => {
  const searchParams = useSearchParams();

  const searchQuery = searchParams?.get("q");

  const router = useRouter();
  const [searchText, setSearchText] = useState(searchQuery ?? "");
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(() => {
      router.replace(`/app/search?q=${searchText}`);
    });
  };

  return (
    <div className="form-control">
      <div className="input-group">
        <input
          type="text"
          placeholder="Search…"
          className="input input-bordered"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          onClick={(e) => handleSearch(e)}
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
