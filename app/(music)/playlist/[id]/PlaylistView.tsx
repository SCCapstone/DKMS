import AudioFeatures from "@/components/music/AudioFeatures";
import { ContextTrackList } from "@/components/music/lists";
import MusicHeader from "@/components/music/MusicHeader";
import PlayButton from "@/components/music/PlayButton";
import ArtistLinks from "@/components/ui/ArtistLinks";
import { formatNumber } from "@/lib/formatters";

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
        content: playlist.description ? (
          playlist.description
        ) : (
          <p>
            Featuring{" "}
            <ArtistLinks artists={tracks.flatMap((track) => track.artists)} />
          </p>
        ),
        buttons: <PlayButton contextUri={playlist.uri} />,
      }}
    />
    <h4 className="font-black uppercase pb-2">Average Playlist Statistics</h4>
    <AudioFeatures audioFeatures={averageAudioFeatures} />
    <div className="divider" />
    <ContextTrackList
      contextUri={playlist.uri}
      tracks={tracks}
      showNumber
      showAlbum
    />
  </>
);

export default AlbumView;
