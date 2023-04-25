"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import transferPlayback from "@/lib/device/transferPlayback";

/* Device logic for playback */
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
  const [isFetching, setIsFetching] = useState(false);

  // Create inline loading UI
  const isMutating = isFetching;

  /* If user selects device */
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFetching(true);
    if (currentDeviceId === device.id) {
      return;
    }
    /* If something is currently playing, transfer playback to device */
    if (isPlaying) {
      await transferPlayback(device.id, true);
    } else {
      await transferPlayback(device.id, false);
    }
    setIsFetching(false);
    toast.success("Device Selected");
    router.refresh();
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
