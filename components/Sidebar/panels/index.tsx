"use client";

import { useSidebar } from "../SidebarContext";

import Friends from "./Friends";
import Notifications from "./Notifications";
import Recommendations from "./Recommendations";

const SidebarPanels = () => {
  const [currentSidebar] = useSidebar();
  switch (currentSidebar) {
    case "friends":
      return <Friends />;
    case "notifications":
      return <Notifications />;
    case "recommendations":
      return (
        <div>
          {/* @ts-expect-error Server Component */}
          <Recommendations />
        </div>
      );
    default:
      return null;
  }
};

export default SidebarPanels;
