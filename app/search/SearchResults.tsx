import Album from "components/music/Album";
import Artist from "components/music/Artist";
import Track from "components/music/Track";

const SearchResults = async ({
  resultsPromise,
}: {
  resultsPromise: Promise<SpotifyApi.SearchResponse>;
}) => {
  const { albums, tracks, artists } = await resultsPromise;

  return (
    <div>
      <h2>Albums</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {albums?.items.map((album) => (
          <Album key={album.id} album={album} />
        ))}
      </div>
      <h2>Artists</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {artists?.items.map((artist) => (
          <Artist key={artist.id} artist={artist} />
        ))}
      </div>
      <h2>Tracks</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tracks?.items.map((track) => (
          <Track key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
