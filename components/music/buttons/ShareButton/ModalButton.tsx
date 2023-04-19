"use client";

import { useState } from "react";

import AddContent from "./AddContent";
import ShareIcon from "./ShareIcon";

import type { User } from "next-auth";

const ModalButton = ({
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
        <ShareIcon />
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

export default ModalButton;
