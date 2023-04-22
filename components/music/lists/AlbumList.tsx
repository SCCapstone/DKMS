import Link from "next/link";

import PlayButton from "@/components/music/buttons/PlayButton";
import { capitalize } from "@/lib/formatters";

const AlbumList = ({
  albums,
  isPremium,
}: {
  albums: SpotifyApi.AlbumObjectSimplified[];
  isPremium: boolean;
}) => (
  <div className="overflow-x-auto">
    <table className="table table-compact w-full">
      <thead>
        <tr>
          <th>Title</th>
          <th>Tracks</th>
          <th>Type</th>
          <th className="text-right">Released</th>
          {isPremium && <th className="text-center">Play</th>}
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
              {new Date(album.release_date).getUTCFullYear()},
            </td>
            {isPremium && (
              <td className="text-center">
                <PlayButton contextUri={album.uri} small />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AlbumList;
