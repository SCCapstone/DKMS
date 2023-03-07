import Image from "next/image";

import { getUserByUsername } from "@/lib/getUser";

const ProfileImg = async ({
  username,
  isProfilePage,
}: {
  username: string | undefined;
  isProfilePage: boolean | undefined;
}) => {
  if (!username) {
    throw new Error("No username provided");
  }

  const profile = await getUserByUsername(username);
  const img = profile?.image;

  if (img) {
    return (
      <Image
        src={img}
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
        alt={`${username}'s profile picture`}
      />
    );
  }

  return (
    <Image
      src="/images/defaults/profileImage.png"
      width={720}
      height={720}
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
      alt="default profile picture"
    />
  );
};

export default ProfileImg;
