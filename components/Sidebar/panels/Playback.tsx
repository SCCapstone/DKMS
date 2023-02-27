/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState } from "react";

import WebPlayback from "../WebPlayback";

const Playback = async () => {
  const [token, setToken] = useState("");
  async function getToken() {
    const response = await fetch("/auth/token");
    const json = await response.json();
    setToken(json.access_token);
  }

  await getToken();
  return <WebPlayback props={token} />;
};

export default Playback;
