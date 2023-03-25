import { Track } from "@/components/music/cards";

const TopTracks = ({ tracks }: { tracks: SpotifyApi.TrackObjectFull[] }) => (
  <div>
    <h2 className="font-black pb-4">Top Tracks</h2>
    <div className="grid grid-cols-3 gap-4 pb-5">
      {tracks.splice(0, 6).map((track) => (
        // @ts-expect-error Next 13 handles async components
        <Track key={track.id} track={track} />
      ))}
    </div>
  </div>
);

export default TopTracks;
