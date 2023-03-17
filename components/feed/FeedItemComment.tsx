import UsernameLink from "@/components/ui/UsernameLink";
import ProfileImg from "@/components/userProfile/profileImg";

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
  <div>
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row items-center pb-4">
        {/* @ts-expect-error Server Component */}
        <ProfileImg username={commentData.username} />
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
        {currentUser.username === commentData.username ? (
          <DeleteButton postData={postData} commentData={commentData} />
        ) : (
          <p />
        )}
      </div>
    </div>
    <p>{commentData.content}</p>
    <div className="divider" />
  </div>
);

export default FeedItemComment;
