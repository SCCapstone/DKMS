import ProfileImage from "@/components/profile/ProfileImage";
import UsernameLink from "@/components/ui/UsernameLink";

import DeleteButton from "./DeleteButton";

import type { FeedCommentType, FeedItemType } from ".";
import type { User } from "next-auth";

const FeedItemComment = ({
  postData,
  commentData,
  showLink,
  currentUser,
}: {
  postData: FeedItemType;
  commentData: FeedCommentType;
  showLink: boolean;
  currentUser: User;
}) => (
  <div id={commentData.id} className="mb-4">
    <div className="flex flex-row justify-between items-center mt-4">
      <div className="flex flex-row items-center pb-4">
        {/* @ts-expect-error Server Component */}
        <ProfileImage username={commentData.username} />
        <div>
          {showLink ? (
            <UsernameLink username={commentData.username} />
          ) : (
            <p>{commentData.username}</p>
          )}
          <p>{commentData.timestamp.toDate().toLocaleString()}</p>
        </div>
      </div>
      <div>
        {currentUser.username === commentData.username && (
          <DeleteButton
            userId={postData.userId}
            postId={postData.id}
            commentId={commentData.id}
          />
        )}
      </div>
    </div>
    <p className="break-words">{commentData.content}</p>
  </div>
);

export default FeedItemComment;
