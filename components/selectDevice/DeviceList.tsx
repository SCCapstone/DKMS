import Device from "./Device";

/* List of devices for playback */
const DeviceList = ({
  deviceList,
  currentDevice,
}: {
  deviceList: SpotifyApi.UserDevice[];
  currentDevice: SpotifyApi.CurrentPlaybackResponse | undefined;
}) => (
  <>
    <h3 className="text-lg font-bold">Select a device</h3>
    <div className="btn-group btn-group-vertical space-y-2">
      {deviceList.map((device) => (
        <Device
          key={device.id}
          device={device}
          currentDeviceId={currentDevice?.device.id ?? ""}
          isPlaying={currentDevice?.is_playing ?? false}
        />
      ))}
    </div>
  </>
);

export default DeviceList;
