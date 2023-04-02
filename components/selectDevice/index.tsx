import getAvailableDevices from "@/lib/device/getAvaliableDevices";
import getPlaybackState from "@/lib/device/getPlaybackState";

import DeviceList from "./deviceList";

const SelectDevice = async () => {
  const playbackState = await getPlaybackState();
  const deviceList = await getAvailableDevices();

  const currentDevice = playbackState.device;
  const isPlaying = playbackState.is_playing;

  return (
    <DeviceList
      deviceList={deviceList}
      currentDevice={currentDevice}
      isPlaying={isPlaying}
    />
  );
};

export default SelectDevice;
