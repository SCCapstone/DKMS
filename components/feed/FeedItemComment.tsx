import UsernameLink from "@/components/ui/UsernameLink";
import ProfileImg from "@/components/userProfile/profileImg";

import type { FeedCommentType } from ".";

const FeedItemComment = ({
  data,
  showLink,
}: {
  data: FeedCommentType;
  showLink: boolean;
}) => (
  <div>
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
    <p>{data.content}</p>
    <div className="divider" />
  </div>
);

export default FeedItemComment;
