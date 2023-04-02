import AudioFeatures from "@/components/music/AudioFeatures";
import { OffsetTrackList } from "@/components/music/lists";
import MusicHeader from "@/components/music/MusicHeader";
import ArtistLinks from "@/components/ui/ArtistLinks";
import { capitalize, formatNumber } from "@/lib/formatters";

const AlbumView = ({
  album,
  artist,
  averageAudioFeatures,
}: {
  album: SpotifyApi.AlbumObjectFull;
  artist: SpotifyApi.ArtistObjectFull;
  averageAudioFeatures: SpotifyApi.AudioFeaturesObject;
}) => (
  <>
    <MusicHeader
      primary={{
        imageUrl: album.images[0].url,
        defaultImage: "/images/defaults/album.png",
        url: album.external_urls.spotify,
        title: album.name,
        subtitle: `Released ${new Date(
          album.release_date
        ).toLocaleDateString()} | ${capitalize(album.album_type)}`,
        content:
          album.artists.length > 1 ? (
            <p>
              Featuring <ArtistLinks artists={album.artists.slice(1)} />
            </p>
          ) : undefined,
        musicItemId: album.id,
        musicItemType: "album",
        playbuttonContext: album.uri,
      }}
      secondary={{
        imageUrl: artist.images[0].url,
        defaultImage: "/images/defaults/artist.png",
        url: artist.external_urls.spotify,
        path: `/artist/${artist.id}`,
        title: artist.name,
        subtitle: `${formatNumber(artist.followers.total)} Followers`,
        isCircle: true,
        musicItemId: artist.id,
        musicItemType: "artist",
        playbuttonContext: artist.uri,
      }}
    />
    <div className="divider" />
    <h4 className="font-black uppercase pb-2">Average Album Statistics</h4>
    <AudioFeatures audioFeatures={averageAudioFeatures} />
    <div className="divider" />
    <OffsetTrackList contextUri={album.uri} tracks={album.tracks.items} />
  </>
);

export default AlbumView;
