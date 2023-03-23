import MusicImage from "./MusicImage";
import OpenSpotifyButton from "./OpenSpotifyButton";

const MusicHeader = ({
  imageUrl,
  defaultImage,
  uri,
  title,
  subtitle,
}: {
  imageUrl: string | undefined;
  defaultImage: string;
  uri: string;
  title: string;
  subtitle: string;
}) => (
  <header className="grid md:grid-flow-col md:auto-cols-max gap-4 md:pb-4 text-center md:text-left">
    <a href={uri} className="w-56 mx-auto">
      {/* @ts-expect-error TODO: fix this */}
      <MusicImage src={imageUrl ?? defaultImage} alt={title} />
    </a>
    <div className="md:pl-2 flex flex-col justify-between">
      <div>
        <h2 className="normal-case font-black text-2xl">{title}</h2>
        <h3 className="normal-case font-extralight">{subtitle}</h3>
      </div>
      <OpenSpotifyButton uri={uri} />
    </div>
  </header>
);

export default MusicHeader;
