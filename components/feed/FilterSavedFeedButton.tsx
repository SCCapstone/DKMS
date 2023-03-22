"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const FilterSavedFeedButton = ({
  filterActive,
}: {
  filterActive?: boolean;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const isMutating = isPending || isFetching;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);

    setIsFetching(false);
    startTransition(() => {
      router.replace(`${filterActive ? "/" : "/saved"}`);
    });
  };

  return (
    <div className="flex flex-row">
      <h2 className="font-semibold mr-4">Filters: </h2>
      <button
        className={`btn ${isMutating ? "loading" : ""} btn-sm ${
          filterActive ? "" : "btn-outline"
        } btn-primary rounded-full mb-5`}
        type="button"
        onClick={(e) => handleClick(e)}
      >
        Saved Posts
      </button>
    </div>
  );
};

export default FilterSavedFeedButton;
