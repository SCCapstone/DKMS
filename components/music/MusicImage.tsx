import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

const MusicImage = async ({ src, alt }: { src: string; alt: string }) => {
  const { base64, img } = await getPlaiceholder(src, {
    size: 10,
  });

  return (
    <figure className="relative aspect-square">
      <Image src={img} alt={alt} fill placeholder="blur" blurDataURL={base64} />
    </figure>
  );
};

export default MusicImage;
