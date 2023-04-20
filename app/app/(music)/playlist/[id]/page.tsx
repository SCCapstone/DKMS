import fetchServer from "@/lib/fetch/fetchServer";
import getAverageAudioFeatures from "@/lib/getAverageAudioFeatures";

import PlaylistView from "./PlaylistView";

export type FilteredDataTrack = {
  added_at: string;
  added_by: SpotifyApi.UserObjectPublic;
} & SpotifyApi.TrackObjectFull;

const getData = async (id: string) => {
  const playlist = await fetchServer<SpotifyApi.PlaylistObjectFull>(
    `https://api.spotify.com/v1/playlists/${id}`
  );

  let hasPodcast = false;

  const tracks = playlist.tracks.items
    .filter((item) => item.track !== null)
    .map((item) => {
      const playlistTrackData = {
        added_at: item.added_at,
        added_by: item.added_by,
        ...item.track,
      } as FilteredDataTrack | SpotifyApi.EpisodeObjectFull;
      return playlistTrackData;
    })
    .filter((item) => {
      if (item.type !== "track") {
        hasPodcast = true;
        return false;
      }
      return true;
    }) as FilteredDataTrack[];

  const audioFeatures =
    await fetchServer<SpotifyApi.MultipleAudioFeaturesResponse>(
      `https://api.spotify.com/v1/audio-features?ids=${tracks
        .map((track) => track.id)
        .join(",")}`
    );

  const averageAudioFeatures = tracks[0]
    ? getAverageAudioFeatures(audioFeatures)
    : undefined;

  return { playlist, tracks, averageAudioFeatures, hasPodcast };
};

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const data = await getData(id);
  return (
    <PlaylistView
      playlist={data.playlist}
      tracks={data.tracks}
      averageAudioFeatures={data.averageAudioFeatures}
      hasPodcast={data.hasPodcast}
    />
  );
};

export default Page;
