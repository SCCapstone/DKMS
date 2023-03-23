"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import deleteNotifications from "@/lib/notifications/deleteNotifications";

const DismissButton = ({ notificationId }: { notificationId: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const isMutating = isPending || isFetching;

  const handleDismiss = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    await deleteNotifications({ notificationIds: [notificationId] });
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={(e) => void handleDismiss(e)}
      disabled={isMutating}
      className={`${isMutating ? "loading" : ""} btn btn-xs btn-outline`}
    >
      Dismiss
    </button>
  );
};

export default DismissButton;
