"use client";

import { useEffect, useState } from "react";

import { formatFollowers } from "@/lib/formatters";
import isItemLiked from "@/lib/likeButton/isItemLiked";
import likeItem from "@/lib/likeButton/likeItem";
import unlikeItem from "@/lib/likeButton/unlikeItem";

const LikeButton = ({
  userId,
  postId,
  likes,
}: {
  userId: string;
  postId: string;
  likes: number;
}) => {
  const [liked, setLiked] = useState(false);

  const [numLikes, setNumLikes] = useState(likes);

  useEffect(() => {
    async function getLikeState() {
      const likeState = await isItemLiked(userId, postId);
      setLiked(likeState);
    }
    void getLikeState();
  }, [userId, postId]);

  const onClick = () => {
    if (liked) {
      void unlikeItem(userId, postId, numLikes);
      setNumLikes(numLikes - 1); // set numLikes after unlikeItem, unlikeItem subtracts 1 in function
      setLiked(!liked);
    } else {
      void likeItem(userId, postId, numLikes);
      setNumLikes(numLikes + 1); // set numLikes after likeItem, likeItem adds 1 in function
      setLiked(!liked);
    }
  };

  if (!liked) {
    return (
      <div className="flex flex-row">
        <svg
          onClick={onClick}
          fill="black"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.57256 9.09995L9.2306 1C9.95823 1 10.6561 1.28446 11.1706 1.79081C11.6851 2.29715 11.9741 2.9839 11.9741 3.69998V7.29996H17.1503C17.4154 7.297 17.678 7.35081 17.9199 7.45765C18.1618 7.5645 18.3772 7.72182 18.5512 7.91872C18.7251 8.11562 18.8535 8.34739 18.9275 8.59798C19.0014 8.84856 19.0191 9.11197 18.9793 9.36995L17.7173 17.4699C17.6511 17.8991 17.4296 18.2903 17.0935 18.5715C16.7574 18.8527 16.3293 19.0048 15.8882 18.9999H5.57256M5.57256 9.09995V18.9999M5.57256 9.09995H2.82902C2.34394 9.09995 1.87872 9.28959 1.53571 9.62715C1.1927 9.96472 1 10.4226 1 10.8999V17.1999C1 17.6773 1.1927 18.1351 1.53571 18.4727C1.87872 18.8102 2.34394 18.9999 2.82902 18.9999H5.57256"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p>{formatFollowers(numLikes)}</p>
      </div>
    );
  }
  return (
    <div className="flex flex-row">
      <svg
        onClick={onClick}
        fill="white"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.57256 9.09995L9.2306 1C9.95823 1 10.6561 1.28446 11.1706 1.79081C11.6851 2.29715 11.9741 2.9839 11.9741 3.69998V7.29996H17.1503C17.4154 7.297 17.678 7.35081 17.9199 7.45765C18.1618 7.5645 18.3772 7.72182 18.5512 7.91872C18.7251 8.11562 18.8535 8.34739 18.9275 8.59798C19.0014 8.84856 19.0191 9.11197 18.9793 9.36995L17.7173 17.4699C17.6511 17.8991 17.4296 18.2903 17.0935 18.5715C16.7574 18.8527 16.3293 19.0048 15.8882 18.9999H5.57256M5.57256 9.09995V18.9999M5.57256 9.09995H2.82902C2.34394 9.09995 1.87872 9.28959 1.53571 9.62715C1.1927 9.96472 1 10.4226 1 10.8999V17.1999C1 17.6773 1.1927 18.1351 1.53571 18.4727C1.87872 18.8102 2.34394 18.9999 2.82902 18.9999H5.57256"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p>{formatFollowers(numLikes)}</p>
    </div>
  );
};

export default LikeButton;
