import Link from "next/link";

const UsernameLink = ({
  username,
  children,
}: {
  username: string;
  children?: React.ReactNode;
}) => (
  <Link className="link link-hover link-primary" href={`/profile/${username}`}>
    {children ?? username}
  </Link>
);

export default UsernameLink;
