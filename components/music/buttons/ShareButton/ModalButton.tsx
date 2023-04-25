"use client";

import { useState } from "react";

import AddContent from "./AddContent";
import ShareIcon from "./ShareIcon";

import type { User } from "next-auth";

/* Modal button for share button */
const ModalButton = ({
  user,
  musicItemId,
  musicItemType,
  small,
}: {
  user: User;
  musicItemId?: string;
  musicItemType?: "track" | "playlist" | "artist" | "album";
  small?: boolean;
}) => {
  const [modal, toggleModal] = useState(false);

  const handleClick = () => {
    toggleModal(!modal);
  };

  return (
    <>
      <button
        className="btn btn-ghost btn-square"
        onClick={handleClick}
        type="button"
        title="Share to feed"
      >
        <ShareIcon small={small} />
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
