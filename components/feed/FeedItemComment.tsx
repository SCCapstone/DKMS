import UsernameLink from "components/ui/UsernameLink";

const FeedItemComment = ({
  username,
  comment,
}: {
  username: string;
  comment: string;
}) => (
  <div>
    <div className="divider" />
    <UsernameLink username={username} />
    <div>{comment}</div>
  </div>
);

export default FeedItemComment;
