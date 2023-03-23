import UsernameLink from "@/components/ui/UsernameLink";
import ProfileImg from "@/components/userProfile/profileImg";

import DeleteButton from "./DeleteButton";
import FeedCommentBox from "./FeedCommentBox";
import FeedItemComment from "./FeedItemComment";
import LikeButton from "./LikeButton";

import type { FeedItemType } from ".";
import type { User } from "next-auth";

const FeedItem = ({
  data,
  currentUser,
  showLink,
}: {
  data: FeedItemType;
  currentUser: User;
  showLink: boolean;
}) => (
  <div>
    <div className="h-fit">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center pb-4">
          {/* @ts-expect-error Server Component */}
          <ProfileImg username={data.username} />
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
            <DeleteButton postId={data.id} />
          )}
        </div>
      </div>
      <p>{data.content}</p>
      <div className="flex flex-row justify-between items-center pt-30 pb-5 pl-15">
        <div className="flex flex-row justify-start items-center">
          <div className="pr-2">
            <svg
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.99988 9L1.39577 3.56299C1.22284 2.0067 2.82456 0.864325 4.2397 1.53465L16.1841 7.19252C17.7092 7.91494 17.7092 10.0851 16.1841 10.8075L4.23971 16.4653C2.82457 17.1357 1.22284 15.9933 1.39577 14.437L1.99988 9ZM1.99988 9H8.99988"
                stroke="#090909"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <LikeButton
              userId={currentUser.id}
              postId={data.id}
              likes={data.likedIds.length}
              likedIds={data.likedIds}
            />
          </div>
        </div>
        <div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
              stroke="#090909"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
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
