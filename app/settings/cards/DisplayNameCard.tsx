"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import setDisplayName from "@/lib/setDisplayName";

const DisplayNameCard = ({
  userId,
  displayName,
}: {
  userId: string;
  displayName: string;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  // Create inline loading UI
  const isMutating = isFetching || isPending;

  const [nameInput, setNameInput] = useState(displayName);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    await setDisplayName(userId, nameInput);
    setIsFetching(false);
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  };
  return (
    <div className="card bg-base-300 shadow-xl">
      <div className="card-body">
        <h4 className="card-title">Display Name</h4>
        <input
          type="text"
          id="name"
          placeholder="Type here"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          className="input w-full max-w-xs"
          disabled={isMutating}
        />

        <button
          className="btn btn-primary"
          onClick={(e) => void handleSubmit(e)}
          type="button"
        >
          {isMutating ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default DisplayNameCard;
