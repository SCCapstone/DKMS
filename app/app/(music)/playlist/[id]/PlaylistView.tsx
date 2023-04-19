import AudioFeatures from "@/components/music/AudioFeatures";
import { OffsetTrackList } from "@/components/music/lists";
import MusicHeader from "@/components/music/MusicHeader";
import ArtistLinks from "@/components/ui/ArtistLinks";
import { formatNumber } from "@/lib/formatters";

import type { FilteredDataTrack } from "./page";

const PlaylistView = ({
  playlist,
  tracks,
  averageAudioFeatures,
}: {
  playlist: SpotifyApi.PlaylistObjectFull;
  tracks: FilteredDataTrack[];
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
          <>
            Featuring{" "}
            <ArtistLinks artists={tracks.flatMap((track) => track.artists)} />
          </>
        ),
        musicItemId: playlist.id,
        musicItemType: "playlist",
        playbuttonContext: playlist.uri,
      }}
    />
    <h4 className="font-black uppercase pb-2">Average Playlist Statistics</h4>
    <AudioFeatures audioFeatures={averageAudioFeatures} />
    <div className="divider" />
    <OffsetTrackList
      contextUri={playlist.uri}
      tracks={tracks}
      showNumber
      showAlbum
    />
  </>
);

export default PlaylistView;
