import UsernameLink from "@/components/ui/UsernameLink";

import BasePanel from "./BasePanel";

const MOCK_DATA = [
  {
    id: "1",
    title: "Kevin",
    username: "kevinnguyen",
    timestamp: "11:23 AM",
    body: "Yoooooo you gotta listen to Colors by Thunder Jackson bro. The Knocks Remix is...",
  },
  {
    id: "2",
    title: "Sophie",
    username: "sophie-saffron",
    timestamp: "11:11 AM",
    body: "Tightrope is such a great song...",
  },
  {
    id: "3",
    title: "Dalton",
    username: "cravend123",
    timestamp: "11:05 AM",
    body: "Ever heard a song called Amoreuse by Clio?",
  },
  {
    id: "4",
    title: "New Release",
    timestamp: "10:27 AM",
    body: "New release from Tame Impala",
  },
  {
    id: "5",
    title: "Dalton",
    username: "cravend123",
    timestamp: "10:11 AM",
    body: "Dalton liked your post.",
  },
  {
    id: "6",
    title: "Sophie",
    username: "sophie-saffron",
    timestamp: "9:58 AM",
    body: "Sophie commented on your post.",
  },
  {
    id: "7",
    title: "Kevin",
    username: "kevinnguyen",
    timestamp: "9:45 AM",
    body: "Kevin saved your playlist.",
  },
  {
    id: "8",
    title: "Test Panel 1",
    username: "kevinnguyen",
    timestamp: "9:45 AM",
    body: "Kevin saved your playlist.",
  },
  {
    id: "9",
    title: "Test Panel 2",
    username: "kevinnguyen",
    timestamp: "9:45 AM",
    body: "Kevin saved your playlist.",
  },
];

const Notification = ({
  title,
  timestamp,
  username,
  body,
}: {
  title: string;
  timestamp: string;
  username: string | undefined;
  body: string;
}) => (
  <li>
    <div className="h-fit">
      <div className="flex flex-row justify-between items-center">
        <h4 className="normal-case font-bold">
          {username ? (
            <UsernameLink username={username}>{title}</UsernameLink>
          ) : (
            title
          )}
        </h4>
        <h5 className="normal-case font-bold">{timestamp}</h5>
      </div>
      <p>{body}</p>
    </div>
    <div className="divider" />
  </li>
);
const Notifications = () => (
  <BasePanel title="Notifications" sidebarId="notifications">
    <ul>
      {MOCK_DATA.map((item) => (
        <Notification
          key={item.id}
          title={item.title}
          timestamp={item.timestamp}
          username={item.username}
          body={item.body}
        />
      ))}
    </ul>
  </BasePanel>
);

export default Notifications;
