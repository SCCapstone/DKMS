"use client";

import fetchClient from "@/lib/fetch/fetchClient";

const clearQueue = async () =>
  fetchClient(`https://api.spotify.com/v1/me/player/queue`, {
    method: "DELETE",
    cache: "no-cache",
  });

export default clearQueue;
