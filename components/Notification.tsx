import "../app/globals.css";

const Notification = () => (
    <div>
    <div className="h-fit">
      <div className="flex flex-row justify-between items-center">
        <div><h1 className="normal-case font-bold">Title</h1></div>
        <div><h1 className="normal-case font-bold">HH:MM PM</h1></div>
      </div>
      <div>Body</div>
    </div>
    <div className="divider" />
  </div>
);

export default Notification;