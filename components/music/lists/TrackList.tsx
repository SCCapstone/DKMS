import { formatDuration } from "@/lib/formatters";

const TrackList = ({
  tracks,
}: {
  tracks: SpotifyApi.TrackObjectSimplified[];
}) => (
  <table className="table table-compact w-full">
    <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Duration</th>
      </tr>
    </thead>
    <tbody>
      {tracks.map((track) => (
        <tr className="hover" key={track.id}>
          <td>{track.track_number}</td>
          <td>
            <a className="font-bold text-primary" href={track.uri}>
              {track.name}
            </a>
          </td>
          <td>{formatDuration(track.duration_ms)}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TrackList;
