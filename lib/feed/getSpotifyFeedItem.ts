import getSpotifyData from "@/lib/getSpotifyData";

const getData = (musicId: string, type: string) => {
  switch (type) {
    case "track":
      return getSpotifyData<SpotifyApi.TrackObjectFull>(
        `https://api.spotify.com/v1/tracks/${musicId}`
      );
    case "playlist":
      return getSpotifyData<SpotifyApi.PlaylistObjectSimplified>(
        `https://api.spotify.com/v1/playlists/${musicId}`
      );
    case "artist":
      return getSpotifyData<SpotifyApi.ArtistObjectFull>(
        `https://api.spotify.com/v1/artists/${musicId}`
      );
    case "album":
      return getSpotifyData<SpotifyApi.AlbumObjectSimplified>(
        `https://api.spotify.com/v1/albums/${musicId}`
      );
    default:
      return undefined;
  }
};

const musicType = (
  trackId?: string,
  playlistId?: string,
  artistId?: string,
  albumId?: string
) => {
  switch (true) {
    case trackId ?? false:
      return "track";
    case albumId ?? false:
      return "album";
    case playlistId ?? false:
      return "playlist";
    case artistId ?? false:
      return "artist";
    default:
      return "";
  }
};

const getSpotifyFeedItem = async (
  trackId?: string,
  playlistId?: string,
  artistId?: string,
  albumId?: string
) => {
  const type = musicType(trackId, playlistId, artistId, albumId);
  const musicId = trackId ?? playlistId ?? artistId ?? albumId ?? "";
  return getData(musicId, type)?.then((data) => data);
};

export default getSpotifyFeedItem;
