import FeedFilterButtons from "./FeedFilterButtons";
import FeedItem from "./FeedItem";
import FeedTextBox from "./FeedTextBox";

import type {
  FirestoreFeedCommentItem,
  FirestoreFeedItem,
} from "@/lib/firestore/types";
import type { User } from "next-auth";

export type FeedCommentType = {
  id: string;
} & FirestoreFeedCommentItem;

export type FeedItemType = {
  id: string;
  comments: FeedCommentType[];
  musicItem?:
    | SpotifyApi.TrackObjectFull
    | SpotifyApi.PlaylistObjectSimplified
    | SpotifyApi.ArtistObjectFull
    | SpotifyApi.AlbumObjectSimplified
    | undefined;
} & Omit<FirestoreFeedItem, "musicItemId" | "musicItemType">;

/* Feed Page */
const FeedPage = ({
  data,
  currentUser,
  savedItemIds,
  showLinks = false,
  isPremium,
}: {
  data: FeedItemType[];
  currentUser: User;
  savedItemIds?: string[];
  showLinks?: boolean;
  isPremium: boolean;
}) => {
  if (data.length === 0) {
    return (
      <div>
        <FeedFilterButtons />
        {showLinks && <FeedTextBox user={currentUser} />}
        <p>No feed items.</p>
      </div>
    );
  }

  return (
    <div>
      <FeedFilterButtons />
      {showLinks && <FeedTextBox user={currentUser} />}
      <ul className="divide-y">
        {data.map((feedItem) => (
          <FeedItem
            key={feedItem.id}
            data={feedItem}
            currentUser={currentUser}
            savedItemIds={savedItemIds}
            showLink={showLinks}
            isPremium={isPremium}
          />
        ))}
      </ul>
    </div>
  );
};

export default FeedPage;
