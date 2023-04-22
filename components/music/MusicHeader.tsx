import Link from "next/link";

import PlayButton from "./buttons/PlayButton";
import ShareButton from "./buttons/ShareButton";
import MusicButtons from "./MusicButtons";
import MusicImage from "./MusicImage";

type CardProps = {
  isPremium: boolean;
  imageUrl: string | undefined;
  defaultImage: string;
  /** The Spotify URL */
  url: string;
  /** The path to the DKMS page */
  path?: string;
  title: string;
  subtitle?: string;
  content?: React.ReactNode;
  /** If the image is a circle */
  isCircle?: boolean;
  /** Data for the ShareIcon */
  musicItemId: string;
  musicItemType: "track" | "playlist" | "artist" | "album";
  /** Playbutton context */
  playbuttonContext: string;
  /** Additional view link */
  viewAlbum?: boolean;
  albumId?: string;
  viewFollow?: boolean;
  artistId?: string;
  isFollowing?: boolean;
};

const HeaderCard = ({
  isPremium,
  imageUrl,
  defaultImage,
  url,
  path,
  title,
  subtitle,
  content,
  isCircle,
  musicItemId,
  musicItemType,
  playbuttonContext,
  viewAlbum,
  albumId,
  viewFollow,
  artistId,
  isFollowing,
}: CardProps) => (
  <>
    <div className="flex flex-col items-center">
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
      <div className="btn-group pt-4">
        {isPremium && <PlayButton contextUri={playbuttonContext} />}
        {/* @ts-expect-error Server Component */}
        <ShareButton musicItemId={musicItemId} musicItemType={musicItemType} />
      </div>
    </div>
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
      <MusicButtons
        spotifyUri={url}
        path={path}
        viewAlbum={viewAlbum}
        albumId={albumId}
        viewFollow={viewFollow}
        artistId={artistId}
        isFollowing={isFollowing}
      />
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
      isPremium={primary.isPremium}
      imageUrl={primary.imageUrl}
      defaultImage={primary.defaultImage}
      url={primary.url}
      path={primary.path}
      title={primary.title}
      subtitle={primary.subtitle}
      content={primary.content}
      isCircle={primary.isCircle}
      musicItemId={primary.musicItemId}
      musicItemType={primary.musicItemType}
      playbuttonContext={primary.playbuttonContext}
      viewAlbum={primary.viewAlbum}
      albumId={primary.albumId}
      viewFollow={primary.viewFollow}
      artistId={primary.artistId}
      isFollowing={primary.isFollowing}
    />
    {secondary && (
      <HeaderCard
        isPremium={secondary.isPremium}
        imageUrl={secondary.imageUrl}
        defaultImage={secondary.defaultImage}
        url={secondary.url}
        path={secondary.path}
        title={secondary.title}
        subtitle={secondary.subtitle}
        content={secondary.content}
        isCircle={secondary.isCircle}
        musicItemId={secondary.musicItemId}
        musicItemType={secondary.musicItemType}
        playbuttonContext={secondary.playbuttonContext}
        viewAlbum={secondary.viewAlbum}
        albumId={secondary.albumId}
        viewFollow={secondary.viewFollow}
        artistId={secondary.artistId}
        isFollowing={secondary.isFollowing}
      />
    )}
  </header>
);

export default MusicHeader;
