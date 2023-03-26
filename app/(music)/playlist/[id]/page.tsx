import fetchServer from "@/lib/fetch/fetchServer";
import getAverageAudioFeatures from "@/lib/getAverageAudioFeatures";

import PlaylistView from "./PlaylistView";

export type extraDataTrack = SpotifyApi.TrackObjectFull & {
  added_at: string;
  added_by: SpotifyApi.UserObjectPublic;
};

const getData = async (id: string) => {
  const playlist = await fetchServer<SpotifyApi.PlaylistObjectFull>(
    `https://api.spotify.com/v1/playlists/${id}`
  );

  const tracks = playlist.tracks.items
    .filter((item) => item.track !== null)
    .map((item) => {
      const { track } = item;
      const at = item.added_at;
      const by = item.added_by;
      return { track, at, by };
    }) as unknown as extraDataTrack[];

  const audioFeatures =
    await fetchServer<SpotifyApi.MultipleAudioFeaturesResponse>(
      `https://api.spotify.com/v1/audio-features?ids=${tracks
        .map((track) => track.id)
        .join(",")}`
    );

  const averageAudioFeatures = getAverageAudioFeatures(audioFeatures);

  return { playlist, tracks, averageAudioFeatures };
};

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const data = await getData(id);
  return (
    <PlaylistView
      playlist={data.playlist}
      tracks={data.tracks}
      averageAudioFeatures={data.averageAudioFeatures}
    />
  );
};

export default Page;
