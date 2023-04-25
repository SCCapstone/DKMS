import AudioFeatures from "@/components/music/AudioFeatures";
import { TrackList } from "@/components/music/lists";
import MusicHeader from "@/components/music/MusicHeader";
import ArtistLinks from "@/components/ui/ArtistLinks";
import { formatNumber } from "@/lib/formatters";

import type { FilteredDataTrack } from "./page";
import type { AverageAudioFeatures } from "@/lib/getAverageAudioFeatures";

/* Playlist Page */
const PlaylistView = ({
  playlist,
  tracks,
  averageAudioFeatures,
  hasPodcast,
  isPremium,
}: {
  playlist: SpotifyApi.PlaylistObjectFull;
  tracks: FilteredDataTrack[];
  averageAudioFeatures: AverageAudioFeatures | undefined;
  hasPodcast: boolean;
  isPremium: boolean;
}) => (
  <>
    <MusicHeader
      primary={{
        isPremium,
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

    {averageAudioFeatures && (
      <>
        <div className="divider" />
        <h4 className="font-black uppercase pb-2">
          Average Playlist Statistics
        </h4>
        <AudioFeatures audioFeatures={averageAudioFeatures} />
        <div className="divider" />
        <h4 className="font-black uppercase pb-2">Songs</h4>
      </>
    )}
    {hasPodcast && (
      <div className="alert alert-warning shadow-lg mb-2">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>
            This playlist contains some podcast episodes, which are not
            currently supported by DKMS
          </span>
        </div>
      </div>
    )}
    {averageAudioFeatures && (
      <TrackList
        contextUri={playlist.uri}
        tracks={tracks}
        showNumber
        showAlbum
        isPremium={isPremium}
      />
    )}
  </>
);

export default PlaylistView;
