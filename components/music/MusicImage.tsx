import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

/* Format for music item images */
const MusicImage = async ({
  src,
  alt,
  isCircle,
}: {
  src: string;
  alt: string;
  isCircle?: boolean;
}) => {
  const { base64, img } = await getPlaiceholder(src, {
    size: 10,
  });

  return (
    <figure
      className={`relative aspect-square shadow-2xl ${
        isCircle ? "rounded-full overflow-clip" : ""
      }`}
    >
      <Image src={img} alt={alt} fill placeholder="blur" blurDataURL={base64} />
    </figure>
  );
};

export default MusicImage;
