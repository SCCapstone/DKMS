import PlayButton from "@/components/music/buttons/PlayButton";
import ArtistLinks from "@/components/ui/ArtistLinks";
import { formatDate, formatDuration } from "@/lib/formatters";

import type { FilteredDataTrack } from "@/app/app/(music)/playlist/[id]/page";

const TrackList = ({
  tracks,
  contextUri,
  showNumber,
  showAlbum,
  isPremium,
}: {
  tracks:
    | SpotifyApi.TrackObjectSimplified[]
    | SpotifyApi.TrackObjectFull[]
    | FilteredDataTrack[];
  contextUri?: string;
  showNumber?: boolean;
  showAlbum?: boolean;
  isPremium: boolean;
}) => (
  <div className="max-w-[40vw] rounded-xl mx-auto bg-neutral p-4">
    <div className="overflow-x-auto rounded-xl">
      <table className="table table-compact w-full [&_th]:first:relative">
        <thead>
          <tr>
            {showNumber && <th>#</th>}
            <th>Title</th>
            <th>Artist</th>
            {showAlbum && "album" in tracks[0] && <th>Album</th>}
            {"added_at" in tracks[0] && <th>Date added</th>}
            {"added_by" in tracks[0] && <th>Added by</th>}
            <th className="text-right">Duration</th>
            {isPremium && <th className="text-center">Play</th>}
          </tr>
        </thead>
        <tbody>
          {tracks.map((track, index) => (
            <tr className="hover" key={track.id}>
              {showNumber && <td>{index + 1}</td>}
              <td>
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
                  <a
                    className="font-bold"
                    href={`/app/album/${track.album.id}`}
                  >
                    {track.album.name}
                  </a>
                </td>
              )}
              {"added_at" in track && <td>{formatDate(track.added_at)}</td>}
              {"added_by" in track && <td>{track.added_by.id}</td>}
              <td className="text-right">
                {formatDuration(track.duration_ms)}
              </td>
              {isPremium && (
                <td className="text-center">
                  {contextUri ? (
                    <PlayButton
                      contextUri={contextUri}
                      offset={track.uri}
                      small
                    />
                  ) : (
                    <PlayButton uris={[track.uri]} small />
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default TrackList;
