import getAverageAudioFeatures from "@/lib/getAverageAudioFeatures";
import getSpotifyData from "@/lib/getSpotifyData";

import PlaylistView from "./PlaylistView";

const getData = async (id: string) => {
  const playlist = await getSpotifyData<SpotifyApi.PlaylistObjectFull>(
    `https://api.spotify.com/v1/playlists/${id}`
  );

  const tracks = playlist.tracks.items
    .map((item) => item.track)
    .filter((track) => track !== null) as SpotifyApi.TrackObjectFull[];

  const audioFeatures =
    await getSpotifyData<SpotifyApi.MultipleAudioFeaturesResponse>(
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
