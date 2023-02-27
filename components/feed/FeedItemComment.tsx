import UsernameLink from "components/ui/UsernameLink";

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
    {showLink ? <UsernameLink username={username} /> : <p>{username}</p>}
    <div>{comment}</div>
    <div className="divider" />
  </div>
);

export default FeedItemComment;
