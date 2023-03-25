import ProfileImage from "@/components/profile/ProfileImage";
import UsernameLink from "@/components/ui/UsernameLink";

import { Playlist, Track } from "../music/cards";

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
        <div className="flex flex-row items-center pb-4">
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
        <div>
          {currentUser.username === data.username && (
            <DeleteButton userId={data.userId} postId={data.id} />
          )}
        </div>
      </div>
      <p>{data.content}</p>
      <div className={data.item ? "grid" : "hidden"}>
        {typeof data.item === "object" &&
          Object.prototype.hasOwnProperty.call(data.item, "id") &&
          data.item.type === "track" && (
            <>
              {/* @ts-expect-error Server Component */}
              <Track user={currentUser} track={data.item} isCompact />
            </>
          )}
        {typeof data.item === "object" &&
          Object.prototype.hasOwnProperty.call(data.item, "id") &&
          data.item.type === "playlist" && (
            <>
              {/* @ts-expect-error Server Component */}
              <Playlist user={currentUser} track={data.item} isCompact />
            </>
          )}
      </div>
      <div className="flex flex-row justify-between items-center pt-30 pb-5 pl-15">
        <div>
          <LikeButton
            userId={currentUser.id}
            postId={data.id}
            likes={data.likedIds.length}
            likedIds={data.likedIds}
            username={currentUser.username}
          />
        </div>
        <SaveFeedItemButton
          userId={currentUser.id}
          postId={data.id}
          savedItemIds={savedItemIds}
        />
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
