import Link from "next/link";

import { capitalize } from "@/lib/formatters";

const AlbumList = ({
  albums,
}: {
  albums: SpotifyApi.AlbumObjectSimplified[];
}) => (
  <table className="table table-compact w-full">
    <thead>
      <tr>
        <th>Title</th>
        <th>Tracks</th>
        <th>Type</th>
        <th className="text-right">Released</th>
      </tr>
    </thead>
    <tbody>
      {albums.map((album) => (
        <tr className="hover" key={album.id}>
          <td>
            <Link
              className="font-bold text-primary"
              href={`/album/${album.id}`}
            >
              {album.name} {album.restrictions?.reason}
            </Link>
          </td>
          <td>{album.total_tracks}</td>
          <td>{capitalize(album.album_type)}</td>
          <td className="text-right">
            {new Date(album.release_date).getUTCFullYear()}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default AlbumList;
