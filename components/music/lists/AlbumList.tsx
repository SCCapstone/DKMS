import Link from "next/link";

import { capitalize } from "@/lib/formatters";

import PlayButton from "../PlayButton";

const AlbumList = ({
  albums,
}: {
  albums: SpotifyApi.AlbumObjectSimplified[];
}) => (
  <div className="overflow-x-auto">
    <table className="table table-compact w-full">
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
            <td className="truncate max-w-[500px]">
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
              {new Date(album.release_date).getUTCFullYear()},
            </td>
            <td className="text-center">
              <PlayButton contextUri={album.uri} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AlbumList;
