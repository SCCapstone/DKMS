import Image from "next/image";

const ProfileImg = ({ img }: { img: string }) => {
  if (img !== "") {
    return (
      <Image
        src={img}
        width={120}
        height={120}
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
