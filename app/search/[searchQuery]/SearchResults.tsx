import Album from "components/music/Album";
import Artist from "components/music/Artist";
import Track from "components/music/Track";

const LOADING_ITEMS = {
  albums: {
    items: Array<undefined>(4).fill(undefined),
  },
  tracks: {
    items: Array<undefined>(4).fill(undefined),
  },
  artists: {
    items: Array<undefined>(4).fill(undefined),
  },
} as const;

const SearchResults = ({
  results,
}: {
  results: SpotifyApi.SearchResponse | undefined;
}) => {
  const { albums, tracks, artists } = results ?? LOADING_ITEMS;

  return (
    <div>
      <h2 className="font-black">Albums</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-5">
        {albums?.items.map((album, index) => (
          // @ts-expect-error Next 13 handles async components
          <Album key={album?.id ?? index} album={album} />
        ))}
      </div>
      <h2 className="font-black">Artists</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-5">
        {artists?.items.map((artist, index) => (
          // @ts-expect-error Next 13 handles async components
          <Artist key={artist?.id ?? index} artist={artist} />
        ))}
      </div>
      <h2 className="font-black">Tracks</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tracks?.items.map((track, index) => (
          // @ts-expect-error Next 13 handles async components
          <Track key={track?.id ?? index} track={track} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
