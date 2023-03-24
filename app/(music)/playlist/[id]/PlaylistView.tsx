import { TrackList } from "@/components/music/lists";
import MusicHeader from "@/components/music/MusicHeader";
import { formatNumber } from "@/lib/formatters";
import joinArtists from "@/lib/joinArtists";

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
        content: playlist.description
          ? playlist.description
          : `Featuring ${joinArtists(
              tracks.flatMap((track) => track.artists)
            )}`,
      }}
    />
    <div className="divider" />
    <TrackList tracks={tracks} showNumber showAlbum />
    <div className="divider" />

    <details>
      <pre>{JSON.stringify(playlist, null, 2)}</pre>
    </details>
  </>
);

export default AlbumView;
