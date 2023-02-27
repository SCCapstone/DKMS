"use client";

import putSpotifyData from "lib/putSpotifyData";

const toggleFollowing = async (username: string, isFollowing: boolean) =>
  putSpotifyData(
    `https://api.spotify.com/v1/me/following?type=user&ids=${username}`,
    {
      method: isFollowing ? "DELETE" : "PUT",
    }
  );

export default toggleFollowing;
