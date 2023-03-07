import Image from "next/image";

import { getUserByUsername } from "@/lib/getUser";

import type { User } from "next-auth";

type ProfileImgProps =
  | {
      username: string;
      user?: never;
      isProfilePage: boolean;
    }
  | {
      username?: never;
      user: User;
      isProfilePage: boolean;
    };

const ProfileImg = async ({
  username,
  user,
  isProfilePage,
}: ProfileImgProps) => {
  const profile = username ? await getUserByUsername(username) : user;
  const img = profile?.image;

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
      alt={`${profile?.username ?? "default"}'s profile picture`}
    />
  );
};

export default ProfileImg;
