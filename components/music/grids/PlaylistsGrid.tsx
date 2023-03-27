import { Playlist } from "@/components/music/cards";

const PlaylistsGrid = ({
  playlists,
}: {
  playlists:
    | readonly SpotifyApi.PlaylistObjectSimplified[]
    | readonly undefined[];
}) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {playlists.map((playlist, index) => (
      // @ts-expect-error Next 13 handles async components
      <Playlist key={playlist?.id ?? index} playlist={playlist} />
    ))}
  </div>
);

export default PlaylistsGrid;
