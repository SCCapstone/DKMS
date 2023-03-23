import Image from "next/image";
import Link from "next/link";

import getSpotifyData from "@/lib/getSpotifyData";

const getData = async (username: string) =>
  getSpotifyData<SpotifyApi.UserProfileResponse>(
    `https://api.spotify.com/v1/users/${username}`
  );

type ProfileImageProps =
  | {
      username: string;
      user?: never;
      isProfilePage: boolean;
      hideLink?: boolean;
    }
  | {
      username?: never;
      user: SpotifyApi.UserObjectPublic;
      isProfilePage: boolean;
      hideLink?: boolean;
    };

const ProfileImage = async ({
  username,
  user,
  isProfilePage,
  hideLink,
}: ProfileImageProps) => {
  const profile = username ? await getData(username) : user;
  const img = profile?.images?.[0]?.url;

  const ImageComponent = (
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

  return hideLink || !profile ? (
    ImageComponent
  ) : (
    <Link href={`/profile/${profile.id}`}>{ImageComponent}</Link>
  );
};

export default ProfileImage;
