import AudioFeatures from "@/components/music/AudioFeatures";
import { ArtistsGrid } from "@/components/music/grids";
import { AlbumList, TrackList } from "@/components/music/lists";
import MusicHeader from "@/components/music/MusicHeader";
import { formatNumber } from "@/lib/formatters";

const ArtistView = ({
  artist,
  topTracks,
  albums,
  isFollowing,
  averageAudioFeatures,
  similarArtists,
}: {
  artist: SpotifyApi.ArtistObjectFull;
  topTracks: SpotifyApi.ArtistsTopTracksResponse;
  albums: SpotifyApi.ArtistsAlbumsResponse;
  isFollowing: boolean;
  averageAudioFeatures: SpotifyApi.AudioFeaturesObject;
  similarArtists: SpotifyApi.ArtistObjectFull[];
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
        musicItemId: artist.id,
        musicItemType: "artist",
        playbuttonContext: artist.uri,
        viewFollow: true,
        artistId: artist.id,
        isFollowing,
      }}
    />
    <div className="divider" />
    <h4 className="font-black uppercase pb-2">Average Artist Statistics</h4>
    <AudioFeatures audioFeatures={averageAudioFeatures} />
    <div className="divider" />
    <h4 className="font-black uppercase pb-2">Top Tracks</h4>
    <TrackList tracks={topTracks.tracks} showAlbum />
    <h4 className="font-black uppercase pb-2">Recent Albums</h4>
    <AlbumList albums={albums.items} />
    <div className="divider" />
    <h4 className="font-black uppercase pb-2">Similar Artists</h4>
    <ArtistsGrid artists={similarArtists} />
  </>
);

export default ArtistView;
