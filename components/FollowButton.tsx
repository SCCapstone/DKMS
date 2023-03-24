"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import toggleFollowing from "@/lib/followers/toggleFollowing";

type FollowButtonProps =
  | {
      isFollowing: boolean;
      username: string;
      id?: undefined;
      followType: "user";
    }
  | {
      isFollowing: boolean;
      username?: undefined;
      id: string;
      followType: "artist";
    };

const FollowButton = ({
  isFollowing,
  username,
  id,
  followType,
}: FollowButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  // Create inline loading UI
  const isMutating = isFetching || isPending;

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    await toggleFollowing(username ?? id, isFollowing, followType);
    setIsFetching(false);
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  };

  return (
    <button
      className={`btn btn-primary btn-sm ${isFollowing ? "btn-outline" : ""}`}
      onClick={(e) => void handleClick(e)}
      type="button"
      disabled={isMutating}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
