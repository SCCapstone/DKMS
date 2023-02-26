import UsernameLink from "components/ui/UsernameLink";

const FeedItemComment = ({
  username,
  comment,
}: {
  username: string;
  comment: string;
}) => (
  <div>
    <UsernameLink username={username} />
    <div>{comment}</div>
    <div className="divider" />
  </div>
);

export default FeedItemComment;
