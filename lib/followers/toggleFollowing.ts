"use client";

import fetchClient from "@/lib/fetch/fetchClient";
/**
 * Toggles following of a user or artist
 *
 * @param username Username of user to follow or unfollow
 * @param isFollowing current status of whether or not the currently logged in user is following the user
 * @param followType determines whether this is a user or an artist
 */
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
