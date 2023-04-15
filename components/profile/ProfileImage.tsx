import Image from "next/image";
import Link from "next/link";

import fetchServer from "@/lib/fetch/fetchServer";

const getData = async (username: string) =>
  fetchServer<SpotifyApi.UserProfileResponse>(
    `https://api.spotify.com/v1/users/${username}`
  );

const ProfileImage = async ({
  username,
  isProfilePage,
  hideLink,
}: {
  username: string;
  isProfilePage: boolean;
  hideLink?: boolean;
}) => {
  const profile = await getData(username);
  const img = profile.images?.[0]?.url;

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
      alt={`${profile.id}'s profile picture`}
    />
  );

  return hideLink ? (
    ImageComponent
  ) : (
    <Link href={`/app/profile/${profile.id}`}>{ImageComponent}</Link>
  );
};

export default ProfileImage;
