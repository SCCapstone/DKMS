"use client";

import SidebarIcons from "./icons";
import { useSidebar } from "./SidebarContext";

import type { SidebarOptions } from "./types";

const SidebarMenu = ({
  onChange,
}: {
  onChange?: (newSidebar: SidebarOptions) => void;
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
    />
  );
};

export default SidebarMenu;
