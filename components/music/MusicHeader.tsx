import MusicImage from "./MusicImage";
import OpenSpotifyButton from "./OpenSpotifyButton";

type CardProps = {
  imageUrl: string | undefined;
  defaultImage: string;
  uri: string;
  title: string;
  subtitle?: string;
  content?: string;
};

const HeaderCard = ({
  imageUrl,
  defaultImage,
  uri,
  title,
  subtitle,
  content,
}: CardProps) => (
  <>
    <a href={uri} className="w-full">
      {/* @ts-expect-error TODO: fix this */}
      <MusicImage src={imageUrl ?? defaultImage} alt={title} />
    </a>
    <div className="flex flex-col justify-between">
      <div>
        <h2 className="normal-case font-black text-2xl">{title}</h2>
        {subtitle && (
          <h3 className="normal-case font-extralight">{subtitle}</h3>
        )}
        {content && <p>{content}</p>}
      </div>
      <OpenSpotifyButton uri={uri} />
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
      title={primary.title}
      subtitle={primary.subtitle}
    />
    {secondary && (
      <HeaderCard
        imageUrl={secondary.imageUrl}
        defaultImage={secondary.defaultImage}
        uri={secondary.uri}
        title={secondary.title}
        subtitle={secondary.subtitle}
      />
    )}
  </header>
);

export default MusicHeader;
