import TrackList from "@/components/music/lists/TrackList";
import MusicHeader from "@/components/music/MusicHeader";
import { capitalize } from "@/lib/formatters";
import joinArtists from "@/lib/joinArtists";

const AlbumView = ({ album }: { album: SpotifyApi.AlbumObjectFull }) => (
  <>
    <MusicHeader
      imageUrl={album.images[0].url}
      defaultImage="/images/defaults/album.png"
      uri={album.uri}
      title={`${album.name} by ${joinArtists(album.artists)}`}
      subtitle={`Released ${album.release_date} | ${capitalize(
        album.album_type
      )}`}
    />
    <div className="divider" />
    <TrackList tracks={album.tracks.items} />
    <div className="divider" />

    <details>
      <pre>{JSON.stringify(album, null, 2)}</pre>
    </details>
  </>
);

export default AlbumView;
