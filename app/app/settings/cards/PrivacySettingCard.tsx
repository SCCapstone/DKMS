"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "react-hot-toast";

import setVisibility from "@/lib/settings/setVisibility";
import toggleVisibility from "@/lib/settings/toggleVisibility";

import type { User } from "next-auth";

/* Privacy setting section of settings page */
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

  /* Change privacy of profile */
  const otherVisibility = toggleVisibility(visibility);
  const handleToggle = async (e: React.ChangeEvent) => {
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
          <div className="form-control">
            <label htmlFor="visibility" className="cursor-pointer label">
              <span className="label-text">Private Account</span>
              <input
                type="checkbox"
                name="visibility"
                id="visibilityToggle"
                disabled={isMutating}
                checked={visibility === "public"}
                className="checkbox checkbox-accent"
                onChange={(e) => void handleToggle(e)}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettingCard;
