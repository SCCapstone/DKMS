import "../../globals.css";

const Notification = () => (
    <div>
    <div className="h-fit">
      <div className="flex flex-row justify-between items-center">
        <div><h1 className="normal-case font-bold">New Release</h1></div>
        <div><h1 className="normal-case font-bold">12:00 PM</h1></div>
      </div>
      <div>New Release from Tame Impala.</div>
    </div>
    <div className="divider" />
  </div>
);

export default Notification;