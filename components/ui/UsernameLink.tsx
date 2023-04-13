import Link from "next/link";

const UsernameLink = ({
  username,
  children,
}: {
  username: string;
  children?: React.ReactNode;
}) => (
  <h5 className="link-primary text-ellipsis overflow-hidden">
    <Link
      className="link link-hover link-primary"
      href={`/profile/${username}`}
    >
      {children ?? username}
    </Link>
  </h5>
);

export default UsernameLink;
