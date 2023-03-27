import { TrackList } from "@/components/music/lists";
import MusicHeader from "@/components/music/MusicHeader";
import ArtistLinks from "@/components/ui/ArtistLinks";
import { formatNumber } from "@/lib/formatters";

const AlbumView = ({
  playlist,
  tracks,
}: {
  playlist: SpotifyApi.PlaylistObjectFull;
  tracks: SpotifyApi.TrackObjectFull[];
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
      }}
    />
    <div className="divider" />
    <TrackList tracks={tracks} showNumber showAlbum />
  </>
);

export default AlbumView;
