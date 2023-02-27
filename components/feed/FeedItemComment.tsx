import UsernameLink from "components/ui/UsernameLink";
import ProfileImg from "components/userProfile/profileImg";

const FeedItemComment = ({
  username,
  comment,
  showLink,
}: {
  username: string;
  comment: string;
  showLink?: boolean;
}) => (
  <div>
    <div className="flex flex-row">
      {/* @ts-expect-error Server Component */}
      <ProfileImg username={username} />
      {showLink ? <UsernameLink username={username} /> : <p>{username}</p>}
    </div>{" "}
    <div>{comment}</div>
    <div className="divider" />
  </div>
);

export default FeedItemComment;
