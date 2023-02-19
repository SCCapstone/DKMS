import Image from "next/image";

import getSpotifyData from "../../lib/getSpotifyData";

const ProfileImg = async ({ username }: { username: string | undefined }) => {
  let img;
  if (username) {
    const getUserProfile = async () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      getSpotifyData<SpotifyApi.UserProfileResponse>(
        `https://api.spotify.com/v1/users/${username}`
      );
    const profile = await getUserProfile();
    img = profile.images ? profile.images[0] : undefined;
  }

  if (img) {
    return (
      <Image
        src={img.url}
        width={300}
        height={300}
        style={{
          width: 30,
          height: 30,
          borderRadius: 30 / 2,
          marginRight: 7,
        }}
        alt=""
      />
    );
  }

  return (
    <Image
      src="/profileImgErr.svg"
      width={96}
      height={96}
      style={{
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        marginRight: 7,
      }}
      alt=""
    />
  );
};

export default ProfileImg;
