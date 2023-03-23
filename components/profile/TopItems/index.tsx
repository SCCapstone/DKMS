import TopArtists from "./TopArtists";
import TopTracks from "./TopTracks";

const TopItems = ({
  artists,
  tracks,
}: {
  artists: SpotifyApi.ArtistObjectFull[];
  tracks: SpotifyApi.TrackObjectFull[];
}) => (
  <div className="grid md:grid-cols-2 gap-4 pb-5">
    <TopArtists artists={artists} />
    <TopTracks tracks={tracks} />
  </div>
);

export default TopItems;
