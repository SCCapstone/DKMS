import Link from "next/link";

import PlayButton from "@/components/music/buttons/PlayButton";
import { capitalize } from "@/lib/formatters";

const AlbumList = ({
  albums,
}: {
  albums: SpotifyApi.AlbumObjectSimplified[];
}) => (
  <div className="max-w-[40vw] rounded-xl mx-auto bg-neutral p-4">
    <div className="overflow-x-auto rounded-xl">
      <table className="table table-compact w-full [&_th]:first:relative">
        <thead>
          <tr>
            <th>Title</th>
            <th>Tracks</th>
            <th>Type</th>
            <th className="text-right">Released</th>
            <th className="text-center">Play</th>
          </tr>
        </thead>
        <tbody>
          {albums.map((album) => (
            <tr className="hover" key={album.id}>
              <td>
                <Link
                  className="font-bold text-primary"
                  href={`/app/album/${album.id}`}
                >
                  {album.name} {album.restrictions?.reason}
                </Link>
              </td>
              <td>{album.total_tracks}</td>
              <td>{capitalize(album.album_type)}</td>
              <td className="text-right">
                {new Date(album.release_date).getUTCFullYear()}
              </td>
              <td className="text-center">
                <PlayButton contextUri={album.uri} small />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AlbumList;
