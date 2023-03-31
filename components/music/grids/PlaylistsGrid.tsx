import { Playlist } from "@/components/music/cards";

const PlaylistsGrid = ({
  playlists,
  isHalf,
}: {
  playlists:
    | readonly SpotifyApi.PlaylistObjectSimplified[]
    | readonly undefined[];
  isHalf?: boolean;
}) => {
  if (playlists.length === 0) {
    return <p>No playlists.</p>;
  }
  return (
    <div
      className={`grid grid-cols-2 ${
        isHalf ? "" : "md:grid-cols-3 lg:grid-cols-4"
      } gap-4`}
    >
      {" "}
      {playlists.map((playlist, index) => (
        // @ts-expect-error Next 13 handles async components
        <Playlist key={playlist?.id ?? index} playlist={playlist} />
      ))}
    </div>
  );
};

export default PlaylistsGrid;
