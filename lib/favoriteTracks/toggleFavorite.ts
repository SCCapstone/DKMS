"use client";

import fetchClient from "@/lib/fetch/fetchClient";

const toggleFavorite = (trackId: string, isFavorited: boolean) =>
  fetchClient(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`, {
    method: isFavorited ? "DELETE" : "PUT",
    cache: "no-cache",
  });

export default toggleFavorite;
