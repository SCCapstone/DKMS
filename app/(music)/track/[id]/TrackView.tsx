import Link from "next/link";

import AudioFeatures from "@/components/music/AudioFeatures";
import { TrackList } from "@/components/music/lists";
import MusicHeader from "@/components/music/MusicHeader";
import { capitalize, formatDuration, formatNumber } from "@/lib/formatters";

const TrackView = ({
  track,
  artist,
  audioFeatures,
  recommendations,
}: {
  track: SpotifyApi.TrackObjectFull;
  artist: SpotifyApi.ArtistObjectFull;
  audioFeatures: SpotifyApi.AudioFeaturesResponse;
  recommendations: SpotifyApi.RecommendationsFromSeedsResponse;
}) => (
  <>
    <MusicHeader
      primary={{
        imageUrl: track.album.images[0].url,
        defaultImage: "/images/defaults/album.png",
        url: track.external_urls.spotify,
        title: track.name,
        subtitle: `Released ${new Date(
          track.album.release_date
        ).toLocaleDateString()} | ${capitalize(
          formatDuration(track.duration_ms)
        )}`,
        content:
          track.album.album_type === "single" ? (
            "Single"
          ) : (
            <p className="font-black text-primary">
              <Link href={`/album/${track.album.id}`}>{track.album.name}</Link>
            </p>
          ),
        musicItemId: track.id,
        musicItemType: "track",
        playbuttonContext: track.uri,
        viewAlbum: true,
        albumId: track.album.id,
      }}
      secondary={{
        imageUrl: artist.images[0].url,
        defaultImage: "/images/defaults/artist.png",
        url: artist.external_urls.spotify,
        path: `/artist/${artist.id}`,
        title: artist.name,
        subtitle: `${formatNumber(artist.followers.total)} Followers`,
        isCircle: true,
        musicItemId: track.artists[0].id,
        musicItemType: "artist",
        playbuttonContext: track.artists[0].uri,
      }}
    />
    <div className="divider" />
    <h4 className="font-black uppercase pb-2">Track Statistics</h4>
    <AudioFeatures audioFeatures={audioFeatures} />
    <div className="divider" />
    <h4 className="font-black uppercase">Similar Tracks</h4>
    <TrackList tracks={recommendations.tracks} showAlbum />
  </>
);

export default TrackView;
