import { getDocs, query, where } from "firebase/firestore";

import { notificationsCol } from "@/lib/firestore";
import { getCurrentUser } from "@/lib/getUser";

import BasePanel from "../BasePanel";

import Notification from "./Notification";

const getData = async () => {
  const currentUser = await getCurrentUser();
  const q = query(notificationsCol, where("recipientId", "==", currentUser.id));
  return (await getDocs(q)).docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const Notifications = async () => {
  const data = await getData();
  return (
    <BasePanel title="Notifications" sidebarId="notifications">
      <ul>
        {data.map((item) => (
          <Notification
            key={item.id}
            feedId={item.feedId}
            title={item.username}
            timestamp={item.timestamp.toDate().toLocaleString()}
            username={item.username}
            body={item.body}
          />
        ))}
      </ul>
    </BasePanel>
  );
};

export default Notifications;
