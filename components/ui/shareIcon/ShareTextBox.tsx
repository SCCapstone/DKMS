"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "react-hot-toast";

import postFeedItem from "@/lib/feed/postFeedItem";

import type { MusicItemTypes } from "@/lib/feed/postFeedItem";
import type { User } from "next-auth";

const ShareTextBox = ({
  user,
  musicItemId,
  musicItemType,
  handleClick,
}: {
  user: User;
  musicItemId?: string;
  musicItemType?: MusicItemTypes;
  handleClick: () => void;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  // Create inline loading UI
  const isMutating = isFetching || isPending;

  const [postText, setPostText] = useState("");

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    await postFeedItem(user, postText, musicItemId, musicItemType);
    toast.success("Shared to Feed!");
    setIsFetching(false);
    startTransition(() => {
      setPostText("");
      handleClick();
      router.refresh();
    });
  };

  return (
    <form>
      <div className="w-full mb-4 rounded-lg bg-base-300">
        <div className="rounded-t-lg">
          <textarea
            id="comment"
            className="textarea w-full rounded-none border-none rounded-t-lg"
            placeholder="Write your musical thoughts..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            required
            disabled={isMutating}
          />
        </div>
        <div className="flex items-center justify-between px-3 py-2">
          <button
            onClick={(e) => void handleSubmit(e)}
            disabled={isMutating}
            type="submit"
            className={`${
              isMutating ? "loading" : ""
            } btn btn-primary btn-outline btn-wide`}
          >
            Share
          </button>
        </div>
      </div>
    </form>
  );
};

export default ShareTextBox;
