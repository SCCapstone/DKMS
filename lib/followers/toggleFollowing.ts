"use client";

import putSpotifyData from "@/lib/putSpotifyData";

const toggleFollowing = async (
  username: string,
  isFollowing: boolean,
  followType: "user" | "artist"
) =>
  putSpotifyData(
    `https://api.spotify.com/v1/me/following?type=${followType}&ids=${username}`,
    {
      method: isFollowing ? "DELETE" : "PUT",
      cache: "no-cache",
    }
  );

export default toggleFollowing;
