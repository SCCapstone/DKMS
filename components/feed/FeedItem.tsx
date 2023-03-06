import UsernameLink from "../ui/UsernameLink";
import ProfileImg from "../userProfile/profileImg";

import FeedCommentBox from "./FeedCommentBox";
import FeedItemComment from "./FeedItemComment";
import LikeButton from "./LikeButton";

import type { FeedItemContent } from ".";
import type { User } from "next-auth";

const FeedItem = ({
  data,
  currentUser,
  showLink,
}: {
  data: FeedItemContent;
  currentUser: User;
  showLink: boolean;
}) => (
  <div>
    <div className="h-fit">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row">
          {/* @ts-expect-error Server Component */}
          <ProfileImg username={data.username} />
          {showLink ? (
            <UsernameLink username={data.username} />
          ) : (
            <p>{data.username}</p>
          )}
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
              d="M13 11.5C13 12.0523 12.5523 12.5 12 12.5C11.4477 12.5 11 12.0523 11 11.5C11 10.9477 11.4477 10.5 12 10.5C12.5523 10.5 13 10.9477 13 11.5Z"
              stroke="#090909"
            />
            <path
              d="M17.5 11.5C17.5 12.0523 17.0523 12.5 16.5 12.5C15.9477 12.5 15.5 12.0523 15.5 11.5C15.5 10.9477 15.9477 10.5 16.5 10.5C17.0523 10.5 17.5 10.9477 17.5 11.5Z"
              stroke="#090909"
            />
            <path
              d="M8.5 11.5C8.5 12.0523 8.05228 12.5 7.5 12.5C6.94772 12.5 6.5 12.0523 6.5 11.5C6.5 10.9477 6.94772 10.5 7.5 10.5C8.05228 10.5 8.5 10.9477 8.5 11.5Z"
              stroke="#090909"
            />
            <path
              d="M21 16C21 16.5304 20.7893 17.0391 20.4142 17.4142C20.0391 17.7893 19.5304 18 19 18H7L3 21V7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7V16Z"
              stroke="#090909"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div>{data.content}</div>
      <div className="flex flex-row justify-between items-center pt-30 pb-5 pl-15">
        <div className="flex flex-row justify-start items-center">
          <div>
            <LikeButton />
          </div>
          <div>
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
            key={comment.id}
            username={comment.username}
            comment={comment.content}
            showLink={showLink}
          />
        ))}
      </ul>
    </div>
    <div className="divider" />
  </div>
);

export default FeedItem;
