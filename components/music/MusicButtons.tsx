import Link from "next/link";

import SpotifyIcon from "@/components/ui/SpotifyIcon";

const MusicButtons = ({
  spotifyUri,
  path,
}: {
  spotifyUri: string;
  path: string | undefined;
}) => (
  <div className="btn-group btn-group-vertical">
    {path && (
      <Link className="btn btn-primary btn-outline w-full" href={path}>
        Open in DKMS
      </Link>
    )}
    <a
      className="btn btn-ghost bg-spotify text-white w-full"
      href={spotifyUri}
      target="_blank"
      rel="noopener noreferrer"
    >
      <SpotifyIcon /> <span className="pl-1">Open in Spotify</span>
    </a>
  </div>
);

export default MusicButtons;
