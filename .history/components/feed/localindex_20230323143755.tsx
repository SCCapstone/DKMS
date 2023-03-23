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

export type FeedItemType = {
  id: string;
  creatorId: string;
  comments: FeedCommentType[];
} & FirestoreFeedItem;

const FeedPage = ({
  data,
  currentUser,
  showLinks = false,
}: {
  data: FeedItemType[];
  currentUser: User;
  showLinks?: boolean;
}) => {
  const [filteredData, setFilteredData] = React.useState<FeedItemType[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadFilteredData = async () => {
      const filteredItemsResult = await Promise.all(
        data.map(async (feedItem) => {
          const isFollowing = await isUserFollowing(feedItem.creatorId);
          return isFollowing ? feedItem : null;
        })
      ).then((filteredItems) => filteredItems.filter(Boolean));
      setFilteredData(filteredItemsResult);
      setLoading(false);
    };
    loadFilteredData();
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
        {filteredData.map((feedItem) => {
          if (feedItem) {
            return (
              <FeedItem
                key={feedItem.id}
                data={feedItem}
                currentUser={currentUser}
                showLink={showLinks}
              />
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default FeedPage;
