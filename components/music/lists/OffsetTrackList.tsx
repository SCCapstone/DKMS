import ArtistLinks from "@/components/ui/ArtistLinks";
import { formatDuration } from "@/lib/formatters";

import PlayButton from "../PlayButton";

const OffsetTrackList = ({
  contextUri,
  tracks,
  showNumber,
  showAlbum,
}: {
  contextUri: string;
  tracks: SpotifyApi.TrackObjectSimplified[] | SpotifyApi.TrackObjectFull[];
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
            <td className="text-right">{formatDuration(track.duration_ms)}</td>
            <td>
              <PlayButton contextUri={contextUri} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default OffsetTrackList;
