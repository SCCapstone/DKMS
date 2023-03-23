import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

const AlbumImage = async ({ src }: { src: string | undefined }) => {
  const imageUrl = src ?? "/images/defaults/album.png";

  const { base64, img } = await getPlaiceholder(imageUrl, {
    size: 10,
  });

  return (
    <figure className="relative aspect-square">
      <Image
        src={img}
        alt="P"
        // alt={album.name}
        fill
        placeholder="blur"
        blurDataURL={base64}
      />
    </figure>
  );
};

export default AlbumImage;
