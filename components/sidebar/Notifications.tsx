/* eslint-disable prettier/prettier */
const MOCK_DATA = [
  {
    id: "1",
    title: "Kevin",
    timestamp: "11:23 AM",
    body: "Yoooooo you gotta listen to Colors by Thunder Jackson bro. The Knocks Remix is...",
  },
  {
    id: "2",
    title: "Sophie",
    timestamp: "11:11 AM",
    body: "Tightrope is such a great song...",
  },
  {
    id: "3",
    title: "Dalton",
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
    timestamp: "10:11 AM",
    body: "Dalton liked your post.",
  },
  {
    id: "6",
    title: "Sophie",
    timestamp: "9:58 AM",
    body: "Sophie commented on your post.",
  },
  {
    id: "7",
    title: "Kevin",
    timestamp: "9:45 AM",
    body: "Kevin saved your playlist.",
  },
];

const Notification = ({ title, timestamp, body }: { title: string; timestamp: string; body: string }) => (
  <div>
            <div className="h-fit">
                <div className="flex flex-row justify-between items-center">
                    <div>
                        <h1 className="normal-case font-bold">{title}</h1>
                    </div>
                    <div>
                        <h1 className="normal-case font-bold">{timestamp}</h1>
                    </div>
                </div>
                <div>{body}</div>
            </div>
            <div className="divider" />
        </div>
);
const Notifications = () => (
  <div className="w-64 h-screen">
    {MOCK_DATA.map((item) => (
      <Notification title={item.title} timestamp={item.timestamp} body={item.body} />
    ))}
  </div>
);

export default Notifications;
