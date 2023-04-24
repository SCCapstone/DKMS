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
  danceRecommendations,
  isPremium,
}: {
  track: SpotifyApi.TrackObjectFull;
  artist: SpotifyApi.ArtistObjectFull;
  audioFeatures: SpotifyApi.AudioFeaturesResponse;
  recommendations: SpotifyApi.RecommendationsFromSeedsResponse;
  danceRecommendations: string[];
  isPremium: boolean;
}) => (
  <>
    <MusicHeader
      primary={{
        isPremium,
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
              <Link href={`/app/album/${track.album.id}`}>
                {track.album.name}
              </Link>
            </p>
          ),
        musicItemId: track.id,
        musicItemType: "track",
        playbuttonContext: track.album.uri,
        viewAlbum: true,
        albumId: track.album.id,
      }}
      secondary={{
        isPremium,
        imageUrl: artist.images[0].url,
        defaultImage: "/images/defaults/artist.png",
        url: artist.external_urls.spotify,
        path: `/app/artist/${artist.id}`,
        title: artist.name,
        subtitle: `${formatNumber(artist.followers.total)} Followers`,
        isCircle: true,
        musicItemId: track.artists[0].id,
        musicItemType: "artist",
        playbuttonContext: track.artists[0].uri,
      }}
    />
    <div className="divider" />
    <h4 className="font-black uppercase pb-2">Song Statistics</h4>
    <AudioFeatures audioFeatures={audioFeatures} />
    {danceRecommendations.length > 0 && (
      <p className="pt-2 text-sm">
        You could dance {danceRecommendations[0]}
        {danceRecommendations[1] ? ` or ${danceRecommendations[1]}` : ""} to
        this!
      </p>
    )}
    <div className="divider" />
    <h4 className="font-black uppercase pb-2">Similar Songs</h4>
    <TrackList
      tracks={recommendations.tracks}
      showAlbum
      isPremium={isPremium}
    />
  </>
);

export default TrackView;
