import Image from "next/image";

import getSpotifyData from "@/lib/getSpotifyData";

const getData = async (username: string) =>
  getSpotifyData<SpotifyApi.UserProfileResponse>(
    `https://api.spotify.com/v1/users/${username}`
  );

type ProfileImgProps =
  | {
      username: string;
      user?: never;
      isProfilePage: boolean;
    }
  | {
      username?: never;
      user: SpotifyApi.UserObjectPublic;
      isProfilePage: boolean;
    };

const ProfileImg = async ({
  username,
  user,
  isProfilePage,
}: ProfileImgProps) => {
  const profile = username ? await getData(username) : user;
  const img = profile?.images?.[0]?.url;

  return (
    <Image
      src={img ?? "/images/defaults/profileImage.png"}
      width={300}
      height={300}
      style={
        isProfilePage
          ? {
              width: 60,
              height: 60,
              borderRadius: 60 / 2,
              marginRight: 7,
            }
          : {
              width: 30,
              height: 30,
              borderRadius: 30 / 2,
              marginRight: 7,
            }
      }
      alt={`${profile?.id ?? "default"}'s profile picture`}
    />
  );
};

export default ProfileImg;
