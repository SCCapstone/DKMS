"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { likeItem, unlikeItem } from "@/lib/likeButton";

const LikeButton = ({
  userId,
  postId,
  likes,
  likedIds,
  username,
}: {
  userId: string;
  postId: string;
  likes: number;
  likedIds: string[] | undefined;
  username: string;
}) => {
  const liked = likedIds?.includes(userId) ?? false;

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  // Create inline loading UI
  const isMutating = isFetching || isPending;

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    if (liked) {
      await unlikeItem(userId, postId);
    } else {
      await likeItem(userId, postId, username);
    }
    setIsFetching(false);
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  };

  return (
    <button
      className={`btn btn-ghost btn-secondary ${isMutating ? "loading" : ""}`}
      type="button"
      onClick={(e) => void handleClick(e)}
      title="Like feed item"
    >
      <svg
        className={liked ? "fill-current" : "fill-base-100"}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-disabled={isMutating}
      >
        <path
          d="M5.57256 9.09995L9.2306 1C9.95823 1 10.6561 1.28446 11.1706 1.79081C11.6851 2.29715 11.9741 2.9839 11.9741 3.69998V7.29996H17.1503C17.4154 7.297 17.678 7.35081 17.9199 7.45765C18.1618 7.5645 18.3772 7.72182 18.5512 7.91872C18.7251 8.11562 18.8535 8.34739 18.9275 8.59798C19.0014 8.84856 19.0191 9.11197 18.9793 9.36995L17.7173 17.4699C17.6511 17.8991 17.4296 18.2903 17.0935 18.5715C16.7574 18.8527 16.3293 19.0048 15.8882 18.9999H5.57256M5.57256 9.09995V18.9999M5.57256 9.09995H2.82902C2.34394 9.09995 1.87872 9.28959 1.53571 9.62715C1.1927 9.96472 1 10.4226 1 10.8999V17.1999C1 17.6773 1.1927 18.1351 1.53571 18.4727C1.87872 18.8102 2.34394 18.9999 2.82902 18.9999H5.57256"
          className="stroke-current"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default LikeButton;
