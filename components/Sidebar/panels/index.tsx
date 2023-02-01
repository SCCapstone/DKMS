"use client";

import { useSidebar } from "../SidebarContext";

import Friends from "./Friends";
import Notifications from "./Notifications";

const SidebarPanels = () => {
  const [currentSidebar] = useSidebar();
  switch (currentSidebar) {
    case "friends":
      return <Friends />;
    case "notifications":
      return <Notifications />;
    default:
      return null;
  }
};

export default SidebarPanels;
