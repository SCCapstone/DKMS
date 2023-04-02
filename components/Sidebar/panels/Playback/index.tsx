import getServerAccessToken from "@/lib/getServerAccessToken";

import PlaybackPanel from "./PlaybackPanel";

const Playback = async () => {
  const accessToken = await getServerAccessToken();
  return <PlaybackPanel accessToken={accessToken} />;
};

export default Playback;
