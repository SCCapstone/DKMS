"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import { TARGET_OPTIONS } from "@/lib/recommendations/recommendationTargets";

import type { ReadonlyURLSearchParams } from "next/navigation";

const checkIsActive = (
  searchParams: ReadonlyURLSearchParams | null,
  key: string
) => searchParams?.get("target") === key;

/* Buttons for recommendation filters */
const RecommendationFilterButtons = () => {
  const router = useRouter();
  const pathname = usePathname() ?? "/app/recommendations";
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    startTransition(() => {
      router.replace(
        checkIsActive(searchParams, key)
          ? `${pathname}`
          : `${pathname}?target=${key}`
      );
    });
  };

  return (
    <>
      <div className="btn-group btn-group-vertical md:btn-group-horizontal w-full">
        {TARGET_OPTIONS.map((option) => (
          <button
            className={`btn btn-sm ${
              checkIsActive(searchParams, option) ? "" : "btn-outline"
            } btn-primary rounded-full`}
            type="button"
            onClick={(e) => handleClick(e, option)}
            disabled={isPending}
            key={option}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="divider" />
    </>
  );
};

export default RecommendationFilterButtons;
