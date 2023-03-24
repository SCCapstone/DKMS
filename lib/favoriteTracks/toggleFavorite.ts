"use client";

import putSpotifyData from "@/lib/putSpotifyData";

const toggleFavorite = (trackId: string, isFavorited: boolean) =>
  putSpotifyData(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`, {
    method: isFavorited ? "DELETE" : "PUT",
    cache: "no-cache",
  });

export default toggleFavorite;
