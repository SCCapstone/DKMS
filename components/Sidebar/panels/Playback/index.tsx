import getServerAccessToken from "@/lib/getServerAccessToken";

import PlaybackPanel from "./PlaybackPanel";

/* Layout for playback panel */
const Playback = async () => {
  const accessToken = await getServerAccessToken();
  return <PlaybackPanel accessToken={accessToken} />;
};

export default Playback;
