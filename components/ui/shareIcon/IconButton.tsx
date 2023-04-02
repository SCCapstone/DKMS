"use client";

import { useState } from "react";

import AddContent from "./addContent";
import Share from "./icon";

import type { User } from "next-auth";

const IconButton = ({
  user,
  musicItemId,
  musicItemType,
}: {
  user: User;
  musicItemId?: string;
  musicItemType?: "track" | "playlist" | "artist" | "album";
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
