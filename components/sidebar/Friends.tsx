/* eslint-disable prettier/prettier */
const MOCK_DATA = [
  {
    id: "1",
    title: "Kevin",
    timestamp: "1 hr",
    body: "Colors - Thunder Jackson",
  },
  {
    id: "2",
    title: "Sophie",
    timestamp: "10 hr",
    body: "Shotgun - George Ezra",
  },
  {
    id: "3",
    title: "Dalton",
    timestamp: "12 hr",
    body: "Les autres on verra - Madam Monsieur",
  },
  {
    id: "4",
    title: "Mason",
    timestamp: "21",
    body: "Tyler Herro - Jack Harlow",
  },
];

const Friend = ({ title, timestamp, body }: { title: string; timestamp: string; body: string }) => (
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
const Friends = () => (
  <div className="w-64 p-4 h-screen">
    {MOCK_DATA.map((item) => (
      <Friend title={item.title} timestamp={item.timestamp} body={item.body} />
    ))}
  </div>
);

export default Friends;