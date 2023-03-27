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
} & FirestoreFeedItem;

const FeedPage = ({
  data,
  currentUser,
  savedItemIds,
  showLinks = false,
}: {
  data: FeedItemType[];
  currentUser: User;
  savedItemIds?: string[];
  showLinks?: boolean;
}) => (
  <div>
    {showLinks && (
      <>
        <FeedTextBox user={currentUser} />
        <div className="divider" />
      </>
    )}
    <ul>
      {data.map((feedItem) => (
        <FeedItem
          key={feedItem.id}
          data={feedItem}
          currentUser={currentUser}
          savedItemIds={savedItemIds}
          showLink={showLinks}
        />
      ))}
    </ul>
  </div>
);

export default FeedPage;
