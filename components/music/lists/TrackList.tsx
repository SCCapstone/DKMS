import { formatDuration } from "@/lib/formatters";

const TrackList = ({
  tracks,
}: {
  tracks: SpotifyApi.TrackObjectSimplified[];
}) => (
  <div className="overflow-x-auto">
    <table className="table table-compact w-full">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th className="text-right">Duration</th>
        </tr>
      </thead>
      <tbody>
        {tracks.map((track, index) => (
          <tr className="hover" key={track.id}>
            <td>{index + 1}</td>
            <td className="max-w-prose">
              <a
                className="font-bold text-primary text-ellipsis "
                href={track.uri}
              >
                {track.name}
              </a>
            </td>
            <td className="text-right">{formatDuration(track.duration_ms)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TrackList;
