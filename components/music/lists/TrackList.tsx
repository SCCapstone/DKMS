import { formatDuration } from "@/lib/formatters";

const TrackList = ({
  tracks,
  showNumber,
  showArtist,
}: {
  tracks: SpotifyApi.TrackObjectSimplified[];
  showNumber?: boolean;
  showArtist?: boolean;
}) => (
  <div className="overflow-x-auto">
    <table className="table table-compact w-full">
      <thead>
        <tr>
          {showNumber && <th>#</th>}
          <th>Title</th>
          {showArtist && <th>Artist</th>}
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
                  className="font-bold text-secondary"
                  href={`/artist/${track.artists[0].id}`}
                >
                  {track.artists[0].name}
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
