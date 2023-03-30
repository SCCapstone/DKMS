import fetchServer from "@/lib/fetch/fetchServer";

const getData = (id: string, type: string) => {
  switch (type) {
    case "track":
      return fetchServer<SpotifyApi.TrackObjectFull>(
        `https://api.spotify.com/v1/tracks/${id}`
      );
    case "playlist":
      return fetchServer<SpotifyApi.PlaylistObjectSimplified>(
        `https://api.spotify.com/v1/playlists/${id}`
      );
    case "artist":
      return fetchServer<SpotifyApi.ArtistObjectFull>(
        `https://api.spotify.com/v1/artists/${id}`
      );
    case "album":
      return fetchServer<SpotifyApi.AlbumObjectSimplified>(
        `https://api.spotify.com/v1/albums/${id}`
      );
    default:
      return undefined;
  }
};

const getSpotifyFeedItem = async (
  musicItemId?: string,
  musicItemType?: "track" | "playlist" | "artist" | "album"
) => {
  const type = musicItemType ?? "";
  const id = musicItemId ?? "";
  return getData(id, type);
};

export default getSpotifyFeedItem;
