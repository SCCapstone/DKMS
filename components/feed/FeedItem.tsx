import { Album, Artist, Playlist, Track } from "@/components/music/cards";
import ProfileImage from "@/components/profile/ProfileImage";
import UsernameLink from "@/components/ui/UsernameLink";

import DeleteButton from "./DeleteButton";
import FeedCommentBox from "./FeedCommentBox";
import FeedItemComment from "./FeedItemComment";
import LikeButton from "./LikeButton";
import SaveFeedItemButton from "./SaveFeedItemButton";

import type { FeedItemType } from ".";
import type { User } from "next-auth";

const FeedItem = ({
  data,
  currentUser,
  savedItemIds,
  showLink,
}: {
  data: FeedItemType;
  currentUser: User;
  savedItemIds?: string[];
  showLink: boolean;
}) => (
  <div id={data.id}>
    <div className="h-fit">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-top pb-4 pt-4">
          {/* @ts-expect-error Server Component */}
          <ProfileImage username={data.username} />
          <div>
            {showLink ? (
              <UsernameLink username={data.username} />
            ) : (
              <p>{data.username}</p>
            )}
            <p>{data.timestamp.toDate().toLocaleString()}</p>
          </div>
        </div>
      </div>
      <p>{data.content}</p>
      {data.musicItem && (
        <div className="grid">
          {data.musicItemType === "track" && (
            // @ts-expect-error Server Component
            <Track
              track={data.musicItem as SpotifyApi.TrackObjectFull}
              isCompact
            />
          )}
          {data.musicItemType === "playlist" && (
            // @ts-expect-error Server Component
            <Playlist
              playlist={data.musicItem as SpotifyApi.PlaylistObjectSimplified}
              isCompact
            />
          )}
          {data.musicItemType === "album" && (
            // @ts-expect-error Server Component
            <Album
              album={data.musicItem as SpotifyApi.AlbumObjectSimplified}
              isCompact
            />
          )}
          {data.musicItemType === "artist" && (
            // @ts-expect-error Server Component
            <Artist
              artist={data.musicItem as SpotifyApi.ArtistObjectFull}
              isCompact
            />
          )}
        </div>
      )}
      <div className="btn-group-horizontal pt-30 pb-5 pl-15">
        <LikeButton
          userId={currentUser.id}
          postId={data.id}
          likes={data.likedIds.length}
          likedIds={data.likedIds}
          username={currentUser.username}
        />
        <SaveFeedItemButton
          userId={currentUser.id}
          postId={data.id}
          savedItemIds={savedItemIds}
        />
        {currentUser.username === data.username && (
          <DeleteButton userId={data.userId} postId={data.id} />
        )}
      </div>
    </div>
    <div className="flex flex-col justify-start">
      <FeedCommentBox postId={data.id} currentUser={currentUser} />
      <ul className="ml-10">
        {data.comments.map((comment) => (
          <FeedItemComment
            postData={data}
            key={comment.id}
            commentData={comment}
            showLink={showLink}
            currentUser={currentUser}
          />
        ))}
      </ul>
    </div>
    <div className="divider" />
  </div>
);

export default FeedItem;
