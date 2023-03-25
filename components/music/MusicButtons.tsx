import Link from "next/link";

import SpotifyIcon from "@/components/ui/SpotifyIcon";

const MusicButtons = ({
  spotifyUri,
  path,
  extraButtons,
}: {
  spotifyUri: string;
  path: string | undefined;
  extraButtons?: React.ReactNode;
}) => (
  <div className="btn-group btn-group-vertical">
    {extraButtons}
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
      <SpotifyIcon /> <span className="pl-1">Open in Spotify</span>
    </a>
  </div>
);

export default MusicButtons;
