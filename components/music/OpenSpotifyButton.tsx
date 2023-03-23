import SpotifyIcon from "@/components/ui/SpotifyIcon";

const OpenSpotifyButton = ({ uri }: { uri: string }) => (
  <a
    className="btn btn-ghost bg-spotify text-white"
    href={uri}
    target="_blank"
    rel="noopener noreferrer"
  >
    <SpotifyIcon /> <span className="pl-1">Open in Spotify</span>
  </a>
);

export default OpenSpotifyButton;
