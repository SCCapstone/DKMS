import ArtistLinks from "@/components/ui/ArtistLinks";
import { formatDate, formatDuration } from "@/lib/formatters";

import type { extraDataTrack } from "@/app/(music)/playlist/[id]/page";

const TrackList = ({
  tracks,
  showNumber,
  showAlbum,
}: {
  tracks:
    | SpotifyApi.TrackObjectSimplified[]
    | SpotifyApi.TrackObjectFull[]
    | extraDataTrack[];
  showNumber?: boolean;
  showAlbum?: boolean;
}) => (
  <div className="overflow-x-auto">
    <table className="table table-compact">
      <thead>
        <tr>
          {showNumber && <th>#</th>}
          <th>Title</th>
          <th>Artist</th>
          {showAlbum && "album" in tracks[0] && <th>Album</th>}
          {"added_at" in tracks[0] && <th>Date added</th>}
          {"added_by" in tracks[0] && <th>Added by</th>}
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
            <td>
              <ArtistLinks artists={track.artists} />
            </td>
            {showAlbum && "album" in track && (
              <td>
                <a className="font-bold" href={`/album/${track.album.id}`}>
                  {track.album.name}
                </a>
              </td>
            )}
            {"added_at" in track && <td>{formatDate(track.added_at)}</td>}
            {"added_by" in track && <td>{track.added_by.id}</td>}
            <td className="text-right">{formatDuration(track.duration_ms)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TrackList;
