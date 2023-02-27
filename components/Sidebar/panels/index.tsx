"use client";

import { useSidebar } from "../SidebarContext";

import Friends from "./Friends";
import Notifications from "./Notifications";
import Playback from "./Playback";

const SidebarPanels = () => {
  const [currentSidebar] = useSidebar();
  switch (currentSidebar) {
    case "friends":
      return <Friends />;
    case "notifications":
      return <Notifications />;
    case "playback":
      /* @ts-expect-error Server Component */
      return <Playback />;
    default:
      return null;
  }
};

export default SidebarPanels;
