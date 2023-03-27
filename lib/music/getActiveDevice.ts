import getDevices from "@/lib/music/getDevices";

async function getActiveDevice() {
  try {
    const devices = await getDevices();
    const activeDevice = devices.devices.find((device) => device.is_active);
    if (activeDevice) {
      return activeDevice; // Return the active device object
    }
    return null; // Return null if no active device is found
  } catch (error) {
    return null;
  }
}
