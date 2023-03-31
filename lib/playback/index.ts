import pause from "@/lib/playback/pause";
import play from "@/lib/playback/play";
import resume from "@/lib/playback/resume";
import skipNext from "@/lib/playback/skipNext";
import skipPrev from "@/lib/playback/skipPrev";

import getAvaliableDevices from "./getAvaliableDevices";
import setActveDevice from "./setActiveDevice";

export {
  play,
  skipNext,
  skipPrev,
  pause,
  resume,
  getAvaliableDevices,
  setActveDevice,
};
