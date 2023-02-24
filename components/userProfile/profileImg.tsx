import Image from "next/image";

import getSpotifyData from "../../lib/getSpotifyData";

const ProfileImg = async ({ username }: { username: string | undefined }) => {
  if (!username) {
    throw new Error("No username provided");
  }

  const getUserProfile = async () =>
    getSpotifyData<SpotifyApi.UserProfileResponse>(
      `https://api.spotify.com/v1/users/${username}`
    );
  const profile = await getUserProfile();
  const img = profile.images?.[0];

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
        alt={`${username}'s profile picture`}
      />
    );
  }

  return (
    <Image
      src="/images/defaults/profileImage.png"
      width={96}
      height={96}
      style={{
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        marginRight: 7,
      }}
      alt="default profile picture"
    />
  );
};

export default ProfileImg;
