import Link from "next/link";

import MusicButtons from "./MusicButtons";
import MusicImage from "./MusicImage";

type CardProps = {
  imageUrl: string | undefined;
  defaultImage: string;
  /** The Spotify URL */
  url: string;
  /** The path to the DKMS page */
  path?: string;
  title: string;
  subtitle?: string;
  content?: React.ReactNode;
  buttons?: React.ReactNode;
  /** If the image is a circle */
  isCircle?: boolean;
};

const HeaderCard = ({
  imageUrl,
  defaultImage,
  url,
  path,
  title,
  subtitle,
  content,
  buttons,
  isCircle,
}: CardProps) => (
  <>
    {path ? (
      <Link href={path} className="w-full">
        {/* @ts-expect-error Next 13 Server Component */}
        <MusicImage
          src={imageUrl ?? defaultImage}
          alt={title}
          isCircle={isCircle}
        />
      </Link>
    ) : (
      <a href={url} className="w-full">
        {/* @ts-expect-error Next 13 Server Component */}
        <MusicImage
          src={imageUrl ?? defaultImage}
          alt={title}
          isCircle={isCircle}
        />
      </a>
    )}
    <div className="flex flex-col justify-between">
      <div>
        <h2 className="font-black text-2xl">{title}</h2>
        {subtitle && <h3 className="font-extralight">{subtitle}</h3>}
        {typeof content === "string" ? (
          <p className="font-extralight">{content}</p>
        ) : (
          content
        )}
      </div>
      <MusicButtons spotifyUri={url} path={path} extraButtons={buttons} />
    </div>
  </>
);

const MusicHeader = ({
  primary,
  secondary,
}: {
  primary: CardProps;
  secondary?: CardProps;
}) => (
  <header className="grid grid-cols-2 md:grid-cols-4 gap-4 md:pb-4 text-center md:text-left">
    <HeaderCard
      imageUrl={primary.imageUrl}
      defaultImage={primary.defaultImage}
      url={primary.url}
      path={primary.path}
      title={primary.title}
      subtitle={primary.subtitle}
      content={primary.content}
      isCircle={primary.isCircle}
      buttons={primary.buttons}
    />
    {secondary && (
      <HeaderCard
        imageUrl={secondary.imageUrl}
        defaultImage={secondary.defaultImage}
        url={secondary.url}
        path={secondary.path}
        title={secondary.title}
        subtitle={secondary.subtitle}
        content={secondary.content}
        isCircle={secondary.isCircle}
        buttons={secondary.buttons}
      />
    )}
  </header>
);

export default MusicHeader;
