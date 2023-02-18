const api_url =
  "https://firestore.googleapis.com/v1/projects/dkms-spotify/databases/(default)/documents/feed_content";

export async function getFeedComments() {
  const response = await fetch(api_url);
  const res = response.json();
}

export async function postFeedComment(comment: string) {
  await fetch(api_url, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      comment: {
        stringValue: comment,
      },
    }),
  });
}
