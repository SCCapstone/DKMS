import { Artist } from "@/components/music/cards";

const TopArtists = ({
  artists,
}: {
  artists: SpotifyApi.ArtistObjectFull[];
}) => (
  <div>
    <h2 className="font-black pb-4">Top Artists</h2>
    <div className="grid grid-cols-3 gap-4 pb-5">
      {artists.splice(0, 6).map((artist) => (
        // @ts-expect-error Next 13 handles async components
        <Artist key={artist.id} artist={artist} />
      ))}
    </div>
  </div>
);

export default TopArtists;
