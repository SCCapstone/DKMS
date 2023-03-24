import { AlbumList, TrackList } from "@/components/music/lists";
import MusicHeader from "@/components/music/MusicHeader";
import { formatNumber } from "@/lib/formatters";

const ArtistView = ({
  artist,
  topTracks,
  albums,
}: {
  artist: SpotifyApi.ArtistObjectFull;
  topTracks: SpotifyApi.ArtistsTopTracksResponse;
  albums: SpotifyApi.ArtistsAlbumsResponse;
}) => (
  <>
    <MusicHeader
      primary={{
        imageUrl: artist.images[0].url,
        defaultImage: "/images/defaults/artist.png",
        uri: artist.uri,
        title: artist.name,
        subtitle: `${formatNumber(artist.followers.total)} Followers`,
        content: `${formatNumber(albums.total)} Releases`,
        isCircle: true,
      }}
    />
    <div className="divider" />
    <h4 className="font-black uppercase">Top Tracks</h4>
    <TrackList tracks={topTracks.tracks} showAlbum />
    <h4 className="font-black uppercase">Recent Albums</h4>
    <AlbumList albums={albums.items} />
    <div className="divider" />

    <details>
      <pre>{JSON.stringify(artist, null, 2)}</pre>
    </details>
  </>
);

export default ArtistView;
