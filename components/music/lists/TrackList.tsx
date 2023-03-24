import { formatDuration } from "@/lib/formatters";
import joinArtists from "@/lib/joinArtists";

const TrackList = ({
  tracks,
  showNumber,
  showArtist,
  showAlbum,
}: {
  tracks: SpotifyApi.TrackObjectSimplified[] | SpotifyApi.TrackObjectFull[];
  showNumber?: boolean;
  showArtist?: boolean;
  showAlbum?: boolean;
}) => (
  <div className="overflow-x-auto">
    <table className="table table-compact w-full">
      <thead>
        <tr>
          {showNumber && <th>#</th>}
          <th>Title</th>
          {showArtist && <th>Artist</th>}
          {showAlbum && <th>Album</th>}
          <th className="text-right">Duration</th>
        </tr>
      </thead>
      <tbody>
        {tracks.map((track, index) => (
          <tr className="hover" key={track.id}>
            {showNumber && <td>{index + 1}</td>}
            <td>
              <a className="font-bold text-primary" href={`/track/${track.id}`}>
                {track.name}
              </a>
            </td>
            {showArtist && (
              <td>
                <a
                  className="font-bold"
                  href={`/artist/${track.artists[0].id}`}
                >
                  {joinArtists(track.artists)}
                </a>
              </td>
            )}
            {showAlbum && "album" in track && (
              <td>
                <a className="font-bold" href={`/album/${track.album.id}`}>
                  {track.album.name}
                </a>
              </td>
            )}
            <td className="text-right">{formatDuration(track.duration_ms)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TrackList;
