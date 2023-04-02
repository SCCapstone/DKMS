import getAvailableDevices from "@/lib/device/getAvaliableDevices";
import getPlaybackState from "@/lib/device/getPlaybackState";

import Device from "./device";

const SelectDeviceModal = async () => {
  const playbackState = await getPlaybackState();
  const deviceList = await getAvailableDevices();

  const currentDevice = playbackState.device;
  const isPlaying = playbackState.is_playing;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Select a device</h3>
        <div className="flex flex-col">
          {deviceList.map((device) => (
            <Device
              key={device.id}
              device={device}
              currentDevice={currentDevice}
              isPlaying={isPlaying}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectDeviceModal;
