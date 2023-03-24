import Friends from "./Friends/Friends";
import Notifications from "./Notifications";

import type { FirestoreProfile, FirestoreUser } from "@/lib/firestore/types";

const SidebarPanels = ({ isDesktop }: { isDesktop?: boolean }) => (
  <div className={isDesktop ? "hidden md:block" : "md:hidden"}>
    <Friends />
    <Notifications />
  </div>
);

export default SidebarPanels;
