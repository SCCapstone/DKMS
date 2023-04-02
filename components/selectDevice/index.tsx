import getAvailableDevices from "@/lib/device/getAvaliableDevices";

import DeviceList from "./DeviceList";

const SelectDevice = async () => {
  const deviceList = await getAvailableDevices();

  const currentDevice = deviceList.find((dev) => {
    if (dev.is_active) {
      return dev;
    }
    return undefined;
  });

  return <DeviceList deviceList={deviceList} currentDevice={currentDevice} />;
};

export default SelectDevice;
