import Link from "next/link";

import SpotifyIcon from "@/components/ui/SpotifyIcon";

import FollowButton from "../FollowButton";

/* Music buttons for artist, album, and track pages */
const MusicButtons = ({
  spotifyUri,
  path,
  viewAlbum,
  albumId,
  viewFollow,
  artistId,
  isFollowing,
}: {
  spotifyUri: string;
  path: string | undefined;
  viewAlbum: boolean | undefined;
  albumId: string | undefined;
  viewFollow: boolean | undefined;
  artistId: string | undefined;
  isFollowing: boolean | undefined;
}) => (
  <div className="btn-group btn-group-vertical">
    {viewAlbum && albumId && (
      <Link
        className="btn btn-primary btn-outline w-full"
        href={`/app/album/${albumId}`}
      >
        View
      </Link>
    )}
    {viewFollow && artistId && (
      <FollowButton
        id={artistId}
        followType="artist"
        isFollowing={isFollowing ?? false}
      />
    )}
    {path && (
      <Link className="btn btn-primary btn-outline w-full" href={path}>
        View
      </Link>
    )}
    <a
      className="btn btn-ghost bg-spotify text-white w-full"
      href={spotifyUri}
      target="_blank"
      rel="noopener noreferrer"
    >
      <SpotifyIcon /> <span className="pl-1 text-xs">Open in Spotify</span>
    </a>
  </div>
);

export default MusicButtons;
