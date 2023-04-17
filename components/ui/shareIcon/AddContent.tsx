"use client";

import ShareTextBox from "./ShareTextBox";

import type { MusicItemTypes } from "@/lib/feed/postFeedItem";
import type { User } from "next-auth";

const AddContent = ({
  user,
  musicItemId,
  musicItemType,
  exit,
  handleClick,
}: {
  user: User;
  musicItemId?: string;
  musicItemType?: MusicItemTypes;
  exit: boolean;
  handleClick: () => void;
}) => {
  if (!exit) {
    return null;
  }
  return (
    <div className="modal modal-open">
      <div className="modal-box relative">
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          type="button"
          onClick={handleClick}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg">Add text to your post!</h3>
        <ShareTextBox
          user={user}
          musicItemId={musicItemId}
          musicItemType={musicItemType}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

export default AddContent;
