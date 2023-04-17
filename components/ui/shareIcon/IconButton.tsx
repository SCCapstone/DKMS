"use client";

import { useState } from "react";

import AddContent from "./AddContent";
import Share from "./icon";

import type { MusicItemTypes } from "@/lib/feed/postFeedItem";
import type { User } from "next-auth";

const IconButton = ({
  user,
  musicItemId,
  musicItemType,
}: {
  user: User;
  musicItemId?: string;
  musicItemType?: MusicItemTypes;
}) => {
  const [modal, toggleModal] = useState(false);

  const handleClick = () => {
    toggleModal(!modal);
  };

  return (
    <>
      <button
        className="btn btn-ghost"
        onClick={handleClick}
        type="button"
        title="Share to feed"
      >
        <Share />
      </button>

      {modal && (
        <AddContent
          user={user}
          musicItemId={musicItemId}
          musicItemType={musicItemType}
          exit={modal}
          handleClick={handleClick}
        />
      )}
    </>
  );
};

export default IconButton;
