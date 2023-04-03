"use client";

import SidebarIcons from "./icons";
import { useSidebar } from "./SidebarContext";

import type { SidebarOptions } from "./types";

const SidebarMenu = ({
  onChange,
  notificationAlert,
  isPremium,
}: {
  onChange?: (newSidebar: SidebarOptions) => void;
  notificationAlert?: boolean;
  isPremium?: boolean;
}) => {
  const [currentSidebar, setCurrentSidebar] = useSidebar();

  const handleSidebarChange = (newSidebar: SidebarOptions) => {
    const sidebarValue = newSidebar === currentSidebar ? "none" : newSidebar;
    setCurrentSidebar(sidebarValue);
    onChange?.(sidebarValue);
  };

  return (
    <SidebarIcons
      onChange={handleSidebarChange}
      currentSelection={currentSidebar}
      notificationAlert={notificationAlert}
      isPremium={isPremium}
    />
  );
};

export default SidebarMenu;
