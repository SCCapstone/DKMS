import AudioFeatures from "@/components/music/AudioFeatures";
import { TrackList } from "@/components/music/lists";
import MusicHeader from "@/components/music/MusicHeader";
import { formatNumber } from "@/lib/formatters";
import joinArtists from "@/lib/joinArtists";

const AlbumView = ({
  playlist,
  tracks,
  averageAudioFeatures,
}: {
  playlist: SpotifyApi.PlaylistObjectFull;
  tracks: SpotifyApi.TrackObjectFull[];
  averageAudioFeatures: SpotifyApi.AudioFeaturesObject;
}) => (
  <>
    <MusicHeader
      primary={{
        imageUrl: playlist.images[0].url,
        defaultImage: "/images/defaults/playlist.png",
        url: playlist.external_urls.spotify,
        title: playlist.name,
        subtitle: `${formatNumber(playlist.followers.total)} Followers | ${
          playlist.tracks.total
        } Tracks`,
        content: playlist.description
          ? playlist.description
          : `Featuring ${joinArtists(
              tracks.flatMap((track) => track.artists)
            )}`,
      }}
    />
    <h4 className="font-black uppercase pb-2">Average Playlist Statistics</h4>
    <AudioFeatures audioFeatures={averageAudioFeatures} />
    <div className="divider" />
    <TrackList tracks={tracks} showNumber showAlbum />
  </>
);

export default AlbumView;
