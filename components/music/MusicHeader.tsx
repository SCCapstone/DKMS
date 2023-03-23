import MusicButtons from "./MusicButtons";
import MusicImage from "./MusicImage";

type CardProps = {
  imageUrl: string | undefined;
  defaultImage: string;
  /** The Spotify URI */
  uri: string;
  /** The path to the DKMS page */
  path?: string;
  title: string;
  subtitle?: string;
  content?: string;
  isCircle?: boolean;
};

const HeaderCard = ({
  imageUrl,
  defaultImage,
  uri,
  path,
  title,
  subtitle,
  content,
  isCircle,
}: CardProps) => (
  <>
    <a href={uri} className="w-full">
      {/* @ts-expect-error TODO: fix this */}
      <MusicImage
        src={imageUrl ?? defaultImage}
        alt={title}
        isCircle={isCircle}
      />
    </a>
    <div className="flex flex-col justify-between">
      <div>
        <h2 className="normal-case font-black text-2xl">{title}</h2>
        {subtitle && (
          <h3 className="normal-case font-extralight">{subtitle}</h3>
        )}
        {content && <p>{content}</p>}
      </div>
      <MusicButtons spotifyUri={uri} path={path} />
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
      uri={primary.uri}
      path={primary.path}
      title={primary.title}
      subtitle={primary.subtitle}
      content={primary.content}
      isCircle={primary.isCircle}
    />
    {secondary && (
      <HeaderCard
        imageUrl={secondary.imageUrl}
        defaultImage={secondary.defaultImage}
        uri={secondary.uri}
        path={secondary.path}
        title={secondary.title}
        subtitle={secondary.subtitle}
        content={secondary.content}
        isCircle={secondary.isCircle}
      />
    )}
  </header>
);

export default MusicHeader;
