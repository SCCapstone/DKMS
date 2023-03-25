import TrackList from "@/components/music/lists/TrackList";
import MusicHeader from "@/components/music/MusicHeader";
import { capitalize } from "@/lib/formatters";
import joinArtists from "@/lib/joinArtists";

const AlbumView = ({
  album,
  artist,
}: {
  album: SpotifyApi.AlbumObjectFull;
  artist: SpotifyApi.ArtistObjectFull;
}) => (
  <>
    <MusicHeader
      primary={{
        imageUrl: album.images[0].url,
        defaultImage: "/images/defaults/album.png",
        uri: album.uri,
        title: album.name,
        subtitle: `Released ${album.release_date} | ${capitalize(
          album.album_type
        )}`,
        content:
          album.artists.length > 1
            ? `Featuring ${joinArtists(album.artists.slice(1))}`
            : undefined,
      }}
      secondary={{
        imageUrl: artist.images[0].url,
        defaultImage: "/images/defaults/artist.png",
        uri: artist.uri,
        path: `/artist/${artist.id}`,
        title: artist.name,
        isCircle: true,
      }}
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
