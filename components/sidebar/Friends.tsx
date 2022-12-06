import UsernameLink from "../ui/UsernameLink";

const MOCK_DATA = [
  {
    id: "1",
    title: "Kevin",
    username: "kevinnguyen",
    timestamp: "1 hr",
    body: "Colors - Thunder Jackson",
  },
  {
    id: "2",
    title: "Sophie",
    username: "sophie-saffron",
    timestamp: "10 hr",
    body: "Shotgun - George Ezra",
  },
  {
    id: "3",
    title: "Dalton",
    username: "cravend123",
    timestamp: "12 hr",
    body: "Les autres on verra - Madam Monsieur",
  },
  {
    id: "4",
    title: "Mason",
    username: "dkms",
    timestamp: "21 hr",
    body: "Tyler Herro - Jack Harlow",
  },
];

const Friend = ({
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
      <div>{body}</div>
    </div>
    <div className="divider" />
  </li>
);
const Friends = () => (
  <ul className="w-64 p-4 h-screen">
    {MOCK_DATA.map((item) => (
      <Friend
        key={item.id}
        title={item.title}
        timestamp={item.timestamp}
        username={item.username}
        body={item.body}
      />
    ))}
  </ul>
);

export default Friends;
