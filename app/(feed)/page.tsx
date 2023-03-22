import { getFeedContent } from "lib/feed";
import getUser from "utils/getUser";

import FeedPage from "../../components/feed/FeedPage";
import PageTitle from "../../components/ui/PageTitle";

import SpotifyWebApi from 'spotify-web-api-js';
import PlaybackBar from "/home/kn11/Documents/fix490/DKMS/app/playbackbar/bar";

import type { FeedItemContent } from "../../components/feed/FeedPage";

const Feed = async () => {
  const data: FeedItemContent[] = await getFeedContent();
  const user = await getUser();

  return (
    <div>
      <PlaybackBar />
      <PageTitle title="Feed" />
      <FeedPage data={data} user={user} showLinks />
    </div>
  );
};
const spotifyApi = new SpotifyWebApi();
export default Feed;
