import type { FeedItemContent } from "../../../components/feed/FeedPage";
import type { NextApiRequest, NextApiResponse } from "next";

export default function feedItemHandler(
  req: NextApiRequest,
  res: NextApiResponse<FeedItemContent>
) {
  const { query, method } = req;

  switch (method) {
    case "GET":
      // get data from database - insert firebase command to get data
      break;
    case "POST":
      // post datat to database - insert firebase command to post data
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
