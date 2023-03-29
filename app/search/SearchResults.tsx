import {
  AlbumsGrid,
  ArtistsGrid,
  PlaylistsGrid,
  TracksGrid,
} from "@/components/music/grids";
import UsernameLink from "@/components/ui/UsernameLink";

import type { FirestoreUser } from "@/lib/firestore/types";

const LOADING_ITEMS = {
  albums: {
    items: Array<undefined>(4).fill(undefined),
  },
  tracks: {
    items: Array<undefined>(4).fill(undefined),
  },
  artists: {
    items: Array<undefined>(4).fill(undefined),
  },
  playlists: {
    items: Array<undefined>(4).fill(undefined),
  },
  users: undefined,
} as const;

type SearchResultsProps = {
  results: (SpotifyApi.SearchResponse & { users: FirestoreUser[] }) | undefined;
};

const SearchResults = ({ results }: SearchResultsProps) => {
  const { albums, tracks, artists, playlists, users } =
    results ?? LOADING_ITEMS;

  return (
    <div>
      {albums?.items && (
        <>
          <h2 className="font-black">Albums</h2>
          <AlbumsGrid albums={albums.items} />
        </>
      )}
      {artists?.items && (
        <>
          <h2 className="font-black">Artists</h2>
          <ArtistsGrid artists={artists.items} />
        </>
      )}
      {tracks?.items && (
        <>
          <h2 className="font-black">Tracks</h2>
          <TracksGrid tracks={tracks.items} />
        </>
      )}
      {playlists?.items && (
        <>
          <h2 className="font-black">Playlists</h2>
          <PlaylistsGrid playlists={playlists.items} />
        </>
      )}
      {users && users.length > 0 && (
        <>
          <h2 className="font-black">DKMS Users</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <UsernameLink username={user.username} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SearchResults;
