import UsernameLink from "../ui/UsernameLink";
import ProfileImg from "../userProfile/profileImg";

import FeedCommentBox from "./FeedCommentBox";
import FeedItemComment from "./FeedItemComment";
import LikeButton from "./LikeButton";

import type { FeedComment } from "./FeedPage";
import type { User } from "next-auth";

const FeedItem = ({
  currentUser,
  docId,
  username,
  feedContent,
  showLink,
  comments,
}: {
  currentUser: User;
  docId: string;
  username: string;
  feedContent: string;
  showLink?: boolean;
  comments: FeedComment[];
}) => (
  <div>
    <div className="h-fit">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row">
          {/* @ts-expect-error Server Component */}
          <ProfileImg username={username} />
          {showLink ? <UsernameLink username={username} /> : <p>{username}</p>}
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
      <div>{feedContent}</div>
      <div className="flex flex-row justify-between items-center pt-30 pb-5 pl-15">
        <div className="flex flex-row justify-start items-center">
          <div>
            <LikeButton />
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
          <div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.18497 19.605L7.7207 18.7606C7.46683 18.5996 7.15397 18.5613 6.86874 18.6563L7.18497 19.605ZM3 21L2.05132 20.6838C1.93154 21.0431 2.02506 21.4393 2.29289 21.7071C2.56073 21.9749 2.95689 22.0685 3.31623 21.9487L3 21ZM4.39499 16.815L5.34367 17.1313C5.43875 16.846 5.40045 16.5332 5.23938 16.2793L4.39499 16.815ZM12 22C17.5228 22 22 17.5228 22 12H20C20 16.4183 16.4183 20 12 20V22ZM6.64923 20.4494C8.19708 21.4315 10.0337 22 12 22V20C10.4242 20 8.95764 19.5454 7.7207 18.7606L6.64923 20.4494ZM6.86874 18.6563L2.68377 20.0513L3.31623 21.9487L7.5012 20.5537L6.86874 18.6563ZM3.94868 21.3162L5.34367 17.1313L3.44631 16.4988L2.05132 20.6838L3.94868 21.3162ZM2 12C2 13.9663 2.56855 15.8029 3.5506 17.3508L5.23938 16.2793C4.45458 15.0424 4 13.5758 4 12H2ZM12 2C6.47715 2 2 6.47715 2 12H4C4 7.58172 7.58172 4 12 4V2ZM22 12C22 6.47715 17.5228 2 12 2V4C16.4183 4 20 7.58172 20 12H22Z"
                fill="#090909"
              />
            </svg>
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
    <div className="divider" />
    <div className="flex flex-col justify-start">
      <div>
        <FeedCommentBox docId={docId} currentUser={currentUser} />
      </div>
      <ul className="ml-10">
        {comments.map((feedComment) => (
          <FeedItemComment
            key={feedComment.id}
            username={feedComment.username}
            comment={feedComment.comment}
          />
        ))}
      </ul>
    </div>
  </div>
);

export default FeedItem;
