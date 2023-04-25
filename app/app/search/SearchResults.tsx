import {
  AlbumsGrid,
  ArtistsGrid,
  PlaylistsGrid,
  TracksGrid,
} from "@/components/music/grids";
import UsernameLink from "@/components/ui/UsernameLink";

import type { FirestoreUser } from "@/lib/firestore/types";

/* Placeholders to appear when page is loading */
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
  isPremium: boolean;
};

/* Page for search results */
const SearchResults = ({ results, isPremium }: SearchResultsProps) => {
  const { albums, tracks, artists, playlists, users } =
    results ?? LOADING_ITEMS;

  return (
    <div>
      {tracks?.items && (
        <>
          <h2 className="font-black pt-2">Songs</h2>
          <TracksGrid tracks={tracks.items} isPremium={isPremium} />
        </>
      )}
      {albums?.items && (
        <>
          <h2 className="font-black pt-2">Albums</h2>
          <AlbumsGrid albums={albums.items} isPremium={isPremium} />
        </>
      )}
      {artists?.items && (
        <>
          <h2 className="font-black pt-2">Artists</h2>
          <ArtistsGrid artists={artists.items} isPremium={isPremium} />
        </>
      )}
      {playlists?.items && (
        <>
          <h2 className="font-black pt-2">Playlists</h2>
          <PlaylistsGrid playlists={playlists.items} isPremium={isPremium} />
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
