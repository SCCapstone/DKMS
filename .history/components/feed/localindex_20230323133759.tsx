import { useState, useEffect } from "react";

import getSpotifyData from "@/lib/getSpotifyData";

import FeedItem from "./FeedItem";
import FeedTextBox from "./FeedTextBox";

import type { FirestoreFeedItem } from "@/lib/firestore/types";
import type { User } from "next-auth";

export type FeedCommentType = {
  id: string;
} & FirestoreFeedItem;

export type FeedItemType = {
  id: string;
  userId: string;
  comments: FeedCommentType[];
} & FirestoreFeedItem;

const isUserFollowing = async (username: string) =>
  getSpotifyData<SpotifyApi.UserFollowsUsersOrArtistsResponse>(
    `https://api.spotify.com/v1/me/following/contains?type=user&ids=${username}`
  ).then((response) => response[0]);

const FeedPage = ({
  data,
  currentUser,
  showLinks = false,
}: {
  data: FeedItemType[];
  currentUser: User;
  showLinks?: boolean;
}) => {
  const [followingIds, setFollowingIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const following =
        await getSpotifyData<SpotifyApi.UsersFollowedArtistsResponse>(
          "https://api.spotify.com/v1/me/following?type=artist"
        );
      setFollowingIds(following.artists.items.map((artist) => artist.id));
    };
    void fetchData();
  }, []);

  const filteredData = data.filter((feedItem) =>
    followingIds.includes(feedItem.userId)
  );

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
