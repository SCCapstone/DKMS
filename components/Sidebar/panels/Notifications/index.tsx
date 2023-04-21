import { getDocs, query, where } from "firebase/firestore";

import { notificationsCol } from "@/lib/firestore";
import { getCurrentUser } from "@/lib/getUser";

import BasePanel from "../BasePanel";

import Notification from "./Notification";

const getData = async () => {
  const currentUser = await getCurrentUser();
  const q = query(notificationsCol, where("recipientId", "==", currentUser.id));
  return (await getDocs(q)).docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .reverse();
};

const Notifications = async () => {
  const data = await getData();
  return (
    <BasePanel title="Notifications" sidebarId="notifications">
      {data.length === 0 ? (
        <div className="card card-compact bg-base-100 text-base-content">
          <div className="card-body items-center text-center">
            <h2 className="card-title">No notifications :(</h2>
          </div>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4">
          {data.map((item) => (
            <Notification
              key={item.id}
              notificationId={item.id}
              feedId={item.feedId}
              title={item.username}
              timestamp={item.timestamp.toDate().toLocaleString()}
              username={item.username}
              body={item.body}
            />
          ))}
        </ul>
      )}
    </BasePanel>
  );
};

export default Notifications;
