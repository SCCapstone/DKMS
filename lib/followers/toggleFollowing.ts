"use client";

import fetchClient from "@/lib/fetch/fetchClient";

const toggleFollowing = async (
  username: string,
  isFollowing: boolean,
  followType: "user" | "artist"
) =>
  fetchClient(
    `https://api.spotify.com/v1/me/following?type=${followType}&ids=${username}`,
    {
      method: isFollowing ? "DELETE" : "PUT",
      cache: "no-cache",
    }
  );

export default toggleFollowing;
