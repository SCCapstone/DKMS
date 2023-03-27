import { Album } from "@/components/music/cards";

const AlbumsGrid = ({
  albums,
}: {
  albums: readonly SpotifyApi.AlbumObjectSimplified[] | readonly undefined[];
}) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {albums.map((album, index) => (
      // @ts-expect-error Next 13 handles async components
      <Album key={album?.id ?? index} album={album} />
    ))}
  </div>
);

export default AlbumsGrid;
