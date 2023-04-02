import getAvailableDevices from "@/lib/device/getAvaliableDevices";
import getPlaybackState from "@/lib/device/getPlaybackState";

import DeviceList from "./DeviceList";

const SelectDevice = async () => {
  const currentDevice = await getPlaybackState();
  const deviceList = await getAvailableDevices();

  return <DeviceList deviceList={deviceList} currentDevice={currentDevice} />;
};

export default SelectDevice;
