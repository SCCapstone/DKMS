import getAvailableDevices from "@/lib/device/getAvaliableDevices";
import getPlaybackState from "@/lib/device/getPlaybackState";

import DeviceList from "./DeviceList";

/* Device list layout */
const SelectDevice = async () => {
  const deviceList = await getAvailableDevices();
  const currentDevice = await getPlaybackState();

  return <DeviceList deviceList={deviceList} currentDevice={currentDevice} />;
};

export default SelectDevice;
