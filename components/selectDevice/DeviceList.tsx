import Device from "./Device";

const DeviceList = ({
  deviceList,
  currentDevice,
}: {
  deviceList: SpotifyApi.UserDevice[];
  currentDevice: SpotifyApi.UserDevice | undefined;
}) => (
  <>
    <h3 className="text-lg font-bold">Select a device</h3>
    <div className="btn-group btn-group-vertical space-y-2">
      {deviceList.map((device) => (
        <Device
          key={device.id}
          device={device}
          currentDeviceId={currentDevice?.id ?? ""}
          isPlaying={currentDevice?.is_active ?? false}
        />
      ))}
    </div>
  </>
);

export default DeviceList;
