import { useState } from "react";

import setActiveDevice from "@/lib/device/setActiveDevice";
import transferPlayback from "@/lib/device/transferPlayback";

type DeviceSelectionProps = {
  deviceId: string;
  currentDeviceId: string;
  isTrackPlaying: boolean;
};

const DeviceSelection = ({
  deviceId,
  currentDeviceId,
  isTrackPlaying,
}: DeviceSelectionProps) => {
  const [isTransferring, setIsTransferring] = useState(false);

  const handleDeviceSelection = () => {
    if (currentDeviceId === deviceId) {
      return;
    }
    setIsTransferring(true);
    void setActiveDevice();

    if (isTrackPlaying) {
      void transferPlayback(deviceId);
    }

    setIsTransferring(false);
  };

  return (
    <button
      type="button"
      className={`${
        currentDeviceId === deviceId ? "bg-green-400" : "bg-gray-200"
      } hover:bg-green-300 rounded-md text-sm p-2 transition-colors duration-150 ${
        isTransferring ? "opacity-50 pointer-events-none" : ""
      }`}
      onClick={handleDeviceSelection}
      disabled={isTransferring}
    >
      {deviceId}
    </button>
  );
};

export default DeviceSelection;
