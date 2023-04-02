import Device from "./device";

const DeviceList = ({
  deviceList,
  currentDevice,
  isPlaying,
}: {
  deviceList: SpotifyApi.UserDevice[];
  currentDevice: SpotifyApi.UserDevice;
  isPlaying: boolean;
}) => (
  <>
    <h3 className="text-lg font-bold">Select a device</h3>
    <div className="flex flex-col space-y-2">
      {deviceList.map((device) => (
        <Device
          key={device.id}
          device={device}
          currentDevice={currentDevice}
          isPlaying={isPlaying}
        />
      ))}
    </div>
  </>
);

export default DeviceList;
