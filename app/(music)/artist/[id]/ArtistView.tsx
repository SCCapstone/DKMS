import FollowButton from "@/components/FollowButton";
import AudioFeatures from "@/components/music/AudioFeatures";
import { AlbumList, TrackList } from "@/components/music/lists";
import MusicHeader from "@/components/music/MusicHeader";
import PlayContext from "@/components/music/PlayContext";
import { formatNumber } from "@/lib/formatters";

const ArtistView = ({
  artist,
  topTracks,
  albums,
  isFollowing,
  averageAudioFeatures,
}: {
  artist: SpotifyApi.ArtistObjectFull;
  topTracks: SpotifyApi.ArtistsTopTracksResponse;
  albums: SpotifyApi.ArtistsAlbumsResponse;
  isFollowing: boolean;
  averageAudioFeatures: SpotifyApi.AudioFeaturesObject;
}) => (
  <>
    <MusicHeader
      primary={{
        imageUrl: artist.images[0].url,
        defaultImage: "/images/defaults/artist.png",
        url: artist.external_urls.spotify,
        title: artist.name,
        subtitle: `${formatNumber(artist.followers.total)} Followers`,
        content: `${formatNumber(albums.total)} Releases`,
        isCircle: true,
        buttons: (
          <>
            <PlayContext uri={artist.uri} />
            <FollowButton
              id={artist.id}
              followType="artist"
              isFollowing={isFollowing}
            />
          </>
        ),
      }}
    />
    <div className="divider" />
    <h4 className="font-black uppercase pb-2">Average Artist Statistics</h4>
    <AudioFeatures audioFeatures={averageAudioFeatures} />
    <div className="divider" />
    <h4 className="font-black uppercase">Top Tracks</h4>
    <TrackList contextUri={artist.uri} tracks={topTracks.tracks} showAlbum />
    <h4 className="font-black uppercase">Recent Albums</h4>
    <AlbumList albums={albums.items} />
  </>
);

export default ArtistView;
