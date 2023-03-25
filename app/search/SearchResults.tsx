import { Album, Artist, Playlist, Track } from "@/components/music/cards";
import UsernameLink from "@/components/ui/UsernameLink";

import type { FirestoreUser } from "@/lib/firestore/types";
import type { User } from "next-auth";

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
  currentUser?: User;
  results: (SpotifyApi.SearchResponse & { users: FirestoreUser[] }) | undefined;
};

const SearchResults = ({ currentUser, results }: SearchResultsProps) => {
  const { albums, tracks, artists, playlists, users } =
    results ?? LOADING_ITEMS;

  return (
    <div>
      <h2 className="font-black">Albums</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-5">
        {albums?.items.map((album, index) => (
          // @ts-expect-error Next 13 handles async components
          <Album key={album?.id ?? index} album={album} />
        ))}
      </div>
      <h2 className="font-black">Artists</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-5">
        {artists?.items.map((artist, index) => (
          // @ts-expect-error Next 13 handles async components
          <Artist key={artist?.id ?? index} artist={artist} />
        ))}
      </div>
      <h2 className="font-black">Tracks</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tracks?.items.map((track, index) => (
          // @ts-expect-error Next 13 handles async components
          <Track key={track?.id ?? index} user={currentUser} track={track} />
        ))}
      </div>
      <h2 className="font-black">Playlists</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-5">
        {playlists?.items.map((playlist, index) => (
          // @ts-expect-error Next 13 handles async components
          <Playlist key={playlist?.id ?? index} playlist={playlist} />
        ))}
      </div>
      {users && (
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
