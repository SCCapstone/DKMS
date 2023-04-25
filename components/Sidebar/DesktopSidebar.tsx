import { getDocs, query, where } from "firebase/firestore";

import { notificationsCol } from "@/lib/firestore";
import { getCurrentUser, getCurrentUserPremium } from "@/lib/getUser";

import SidebarPanels from "./panels";
import SidebarMenu from "./SidebarMenu";

/* Get notification alerts to indicate if there are notifications present */
const getNotificationAlert = async () => {
  const currentUser = await getCurrentUser();
  const q = query(notificationsCol, where("recipientId", "==", currentUser.id));
  const data = (await getDocs(q)).docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .reverse();
  return data.length !== 0;
};

/* Layout for sidebar on desktop */
const DesktopSidebar = async () => {
  const notificationAlert = await getNotificationAlert();
  const isPremium = await getCurrentUserPremium();
  return (
    <div className="hidden md:flex h-100% sticky top-0">
      <div className="h-screen sticky top-0 overflow-y-scroll">
        <SidebarPanels isDesktop />
      </div>
      <div className="hidden md:block w-12 h-100% flex-col items-center gap-8 bg-primary text-primary-content">
        <div className="flex flex-col h-screen sticky top-0">
          <SidebarMenu
            notificationAlert={notificationAlert}
            isPremium={isPremium}
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
