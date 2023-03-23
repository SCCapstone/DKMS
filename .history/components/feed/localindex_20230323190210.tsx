import React from "react";

import getSpotifyData from "@/lib/getSpotifyData";

import FeedItem from "./FeedItem";
import FeedTextBox from "./FeedTextBox";

import type { FirestoreFeedItem } from "@/lib/firestore/types";
import type { User } from "next-auth";

const isUserFollowing = async (username: string) =>
  getSpotifyData<SpotifyApi.UserFollowsUsersOrArtistsResponse>(
    `https://api.spotify.com/v1/me/following/contains?type=user&ids=${username}`
  ).then((response) => response[0]);

export type FeedCommentType = {
  id: string;
} & FirestoreFeedItem;

export type FirestoreFeedItemWithComments = FirestoreFeedItem & {
  comments: FeedCommentType[];
};

export type FeedItemType = {
  id: string;
  userId: string; // Add `userId` to the `FeedItemType` type
  comments: FeedCommentType[];
} & FirestoreFeedItemWithComments;

type FilteredFeedItemType = FeedItemType;

const FeedPage = ({
  data,
  currentUser,
  showLinks = false,
}: {
  data: FeedItemType[];
  currentUser: User;
  showLinks?: boolean;
}) => {
  const [filteredData, setFilteredData] = React.useState<
    FilteredFeedItemType[]
  >([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadFilteredData = async () => {
      const filteredItemsResult = (await Promise.all(
        data.map(async (feedItem) => {
          const isFollowing = await isUserFollowing(feedItem.userId);
          return isFollowing ? feedItem : null;
        })
      ).then((filteredItems) =>
        filteredItems.filter(Boolean)
      )) as FilteredFeedItemType[];
      setFilteredData(filteredItemsResult);
      setLoading(false);
    };
    void loadFilteredData();
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {showLinks && (
        <>
          <FeedTextBox user={currentUser} />
          <div className="divider" />
        </>
      )}
      <ul>
        {filteredData.map((feedItem) => (
          <FeedItem
            key={feedItem.id}
            data={feedItem}
            currentUser={currentUser}
            showLink={showLinks}
          />
        ))}
      </ul>
    </div>
  );
};

export default FeedPage;
