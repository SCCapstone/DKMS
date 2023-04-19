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
    <table className="table table-compact w-full">
      <thead>
        <tr>
          {showNumber && <th>#</th>}
          <th>Title</th>
          <th>Artist</th>
          {showAlbum && "album" in tracks[0] && <th>Album</th>}
          <th className="text-right">Duration</th>
          <th className="text-center">Play</th>
        </tr>
      </thead>
      <tbody>
        {tracks.map((track, index) => (
          <tr className="hover" key={track.id}>
            {showNumber && <td>{index + 1}</td>}
            <td className="truncate max-w-[400px]">
              <a
                className="font-bold text-primary"
                href={`/app/track/${track.id}`}
              >
                {track.name}
              </a>
            </td>
            <td>
              <ArtistLinks artists={track.artists} />
            </td>
            {showAlbum && "album" in track && (
              <td>
                <a className="font-bold" href={`/app/album/${track.album.id}`}>
                  {track.album.name}
                </a>
              </td>
            )}
            <td className="text-right">{formatDuration(track.duration_ms)}</td>
            <td className="text-center">
              <PlayButton contextUri={contextUri} offset={track.uri} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default OffsetTrackList;
