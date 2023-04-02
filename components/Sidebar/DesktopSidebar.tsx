import { getDocs, query, where } from "firebase/firestore";

import { notificationsCol } from "@/lib/firestore";
import { getCurrentUser } from "@/lib/getUser";

import SidebarPanels from "./panels";
import SidebarMenu from "./SidebarMenu";

const getNotificationAlert = async () => {
  const currentUser = await getCurrentUser();
  const q = query(notificationsCol, where("recipientId", "==", currentUser.id));
  const data = (await getDocs(q)).docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .reverse();
  return data.length === 0;
};

const DesktopSidebar = async () => {
  const notificationAlert = await getNotificationAlert();
  return (
    <div className="hidden md:flex h-100% sticky top-0">
      <div className="h-screen sticky top-0 overflow-y-scroll">
        <SidebarPanels isDesktop />
      </div>
      <div className="hidden md:block w-12 h-100% flex-col items-center gap-8 bg-primary text-primary-content">
        <div className="flex flex-col h-screen sticky top-0">
          <SidebarMenu notificationAlert={notificationAlert} />
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
