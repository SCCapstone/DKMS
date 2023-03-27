"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "react-hot-toast";

import setVisibility from "@/lib/settings/setVisibility";
import toggleVisibility from "@/lib/settings/toggleVisibility";

import type { User } from "next-auth";

const PrivacySettingCard = ({
  userId,
  visibility,
}: {
  userId: string;
  visibility: User["visibility"];
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  // Create inline loading UI
  const isMutating = isFetching || isPending;

  const otherVisibility = toggleVisibility(visibility);
  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    await setVisibility(userId, otherVisibility);
    setIsFetching(false);
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();

      toast.success("Visibility updated!");
    });
  };
  return (
    <div className="card bg-base-300 shadow-xl">
      <div className="card-body">
        <h4 className="card-title">Privacy Settings</h4>
        <p className="text-xs">
          Setting yourself to private hides you from the global feed and search
          pages.
        </p>
        <div className="flex flex-col">
          <div className="form-control w-52">
            <label htmlFor="visibility" className="cursor-pointer label">
              <span className="label-text">Set {otherVisibility}</span>
              <input
                type="checkbox"
                name="visibility"
                id="visibilityToggle"
                className="toggle toggle-primary"
                disabled={isMutating}
                checked={visibility === "public"}
                onClick={(e) => void handleToggle(e)}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettingCard;
