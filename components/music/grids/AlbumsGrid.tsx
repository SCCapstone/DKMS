import { AlbumCard } from "@/components/music/cards";

const AlbumsGrid = ({
  albums,
  isHalf,
}: {
  albums: readonly SpotifyApi.AlbumObjectSimplified[] | readonly undefined[];
  isHalf?: boolean;
}) => (
  <div
    className={`grid grid-cols-2 ${
      isHalf ? "" : "md:grid-cols-3 lg:grid-cols-4"
    } gap-4`}
  >
    {albums.map((album, index) => (
      <AlbumCard key={album?.id ?? index} album={album} />
    ))}
  </div>
);

export default AlbumsGrid;
