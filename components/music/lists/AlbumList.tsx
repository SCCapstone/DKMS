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
          <th className="text-center">Tracks</th>
          <th className="text-center">Type</th>
          <th className="text-center">Released</th>
          <th className="text-center">Play</th>
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
            <td className="text-center">{album.total_tracks}</td>
            <td className="text-center">{capitalize(album.album_type)}</td>
            <td className="text-center">
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
