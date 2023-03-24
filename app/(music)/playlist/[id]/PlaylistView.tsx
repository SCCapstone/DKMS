import { TrackList } from "@/components/music/lists";
import MusicHeader from "@/components/music/MusicHeader";
import { formatNumber } from "@/lib/formatters";

const AlbumView = ({
  playlist,
  tracks,
}: {
  playlist: SpotifyApi.PlaylistObjectFull;
  tracks: SpotifyApi.TrackObjectFull[];
}) => (
  <>
    <MusicHeader
      primary={{
        imageUrl: playlist.images[0].url,
        defaultImage: "/images/defaults/playlist.png",
        uri: playlist.uri,
        title: playlist.name,
        subtitle: `${formatNumber(playlist.followers.total)} Followers | ${
          playlist.tracks.total
        } Tracks`,
        content: playlist.description ?? `Featuring ${"hi"}`,
      }}
    />
    <div className="divider" />
    <TrackList tracks={tracks} showNumber showArtist />
    <div className="divider" />

    <details>
      <pre>{JSON.stringify(playlist, null, 2)}</pre>
    </details>
  </>
);

export default AlbumView;
