import UsernameLink from "@/components/ui/UsernameLink";

import DismissButton from "./DismissButton";

const Notification = ({
  notificationId,
  feedId,
  title,
  timestamp,
  username,
  body,
}: {
  notificationId: string;
  feedId: string;
  title: string;
  timestamp: string;
  username: string | undefined;
  body: string;
}) => (
  <li className="card card-compact bg-base-100 relative">
    <a href={`/#${feedId}`} className="card-body">
      <header className="pb-2">
        <h4 className="font-bold text-base">
          {username ? (
            <UsernameLink username={username}>{title}</UsernameLink>
          ) : (
            title
          )}
        </h4>
        <h5 className="text-xs">{timestamp}</h5>
      </header>
      <p>{body}</p>
      <div className="card-actions justify-end">
        <DismissButton notificationId={notificationId} />
      </div>
    </a>
  </li>
);

export default Notification;
