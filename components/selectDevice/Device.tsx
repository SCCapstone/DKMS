"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import transferPlayback from "@/lib/device/transferPlayback";

const Device = ({
  device,
  currentDeviceId,
  isPlaying,
}: {
  device: SpotifyApi.UserDevice;
  currentDeviceId: string;
  isPlaying: boolean;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  // Create inline loading UI
  const isMutating = isFetching || isPending;

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    if (currentDeviceId === device.id) {
      return;
    }
    if (isPlaying) {
      await transferPlayback(device.id, true);
    } else {
      await transferPlayback(device.id, false);
    }
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <button
      className={`btn normal-case ${isMutating ? "loading" : ""}`}
      type="button"
      disabled={isMutating}
      onClick={(e) => void handleClick(e)}
    >
      {`${device.name} ${currentDeviceId === device.id ? "[Current]" : ""}`}
    </button>
  );
};

export default Device;
