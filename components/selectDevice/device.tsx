"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import transferPlayback from "@/lib/device/transferPlayback";

const Device = ({
  device,
  currentDevice,
  isPlaying,
}: {
  device: SpotifyApi.UserDevice;
  currentDevice: SpotifyApi.UserDevice;
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
    if (currentDevice.id === device.id) {
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
      className={isMutating ? "btn loading" : "btn"}
      type="button"
      disabled={isMutating}
      onClick={(e) => void handleClick(e)}
    >
      {`${device.name} ${currentDevice.id === device.id ? "[Current]" : ""}`}
    </button>
  );
};

export default Device;
