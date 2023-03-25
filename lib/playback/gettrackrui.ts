import getAccessToken from "../getAccessToken";

type CurrentlyPlayingResponse = {
  item: {
    uri: string;
  };
};

const getCurrentTrackUri = async () => {
  const token = await getAccessToken();
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        // Authorization: `Bearer BQBRqioXZiuN3WFww6b2kthaev6to6fL9Xa71pEwfWSTQxmMmS775Hht64kuZiPV-zUpSabdGme-sjUKCiKOIpP5sdQWKA0r_WthZl7_XMra_1YlUUG-5oPGUI756mgosnVBg0BQiAMBvMpkJ-VptSAse5qbXM0KChWXAuvrs84_5o09IinKenHNk3aGkHuBaJyHz8baDcfqP9s8XXm1tBTQO-GriEKtKHMAOBo0ift6G5D28TEqgT-zo3dHxaShfLy9Q-TdXg7q7_lmqfVLy75zHLTNR3Wqg0_-6rLeNZ_S8QmjLSStzGne`,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  // todo if not empty.... etc
  return response.json();

  /* const data: CurrentlyPlayingResponse = await response.json();
  return data.item.uri || null; // return the track URI, or null if none is playing */
};

export default getCurrentTrackUri;
