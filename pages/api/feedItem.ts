import type { FeedItemContent } from "../../components/feed/FeedPage";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<FeedItemContent[]>
) {
  // Get data from database
  // res.status(200).json();
}
