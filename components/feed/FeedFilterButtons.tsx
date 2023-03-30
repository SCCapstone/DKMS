"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { toast } from "react-hot-toast";

const FeedFilterButtons = () => {
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const searchParams = useSearchParams();
  const filterActive = searchParams?.get("s") === "true";

  const [isPending, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(() => {
      router.replace(filterActive ? `${pathname}` : `${pathname}?s=true`);
      if (filterActive) toast.success("Switched to save posts.");
      else toast.success("Switched to all posts.");
    });
  };

  return (
    <>
      <div className="flex flex-row gap-4 items-center">
        <h2 className="font-semibold">Filters: </h2>
        <div className="btn-group">
          <button
            className={`btn ${isPending ? "loading" : ""} btn-sm ${
              filterActive ? "" : "btn-outline"
            } btn-primary rounded-full`}
            type="button"
            onClick={(e) => handleClick(e)}
            disabled={isPending}
          >
            Saved Posts
          </button>
        </div>
      </div>
      <div className="divider" />
    </>
  );
};

export default FeedFilterButtons;
