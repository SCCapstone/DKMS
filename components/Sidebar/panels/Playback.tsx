import getServerAccessToken from "lib/getServerAccessToken";

import WebPlayback from "../WebPlayback";

const Playback = () => {
  const accessToken = getServerAccessToken();
  return <WebPlayback token={accessToken} />;
};

export default Playback;
