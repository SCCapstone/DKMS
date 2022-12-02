"use client";

import { useState } from "react";

import Friends from "./Friends";
import FriendsIcon from "./icons/FriendsIcon";
import NotificationIcon from "./icons/NotificationIcon";
import Notifications from "./Notifications";

const SIDEBAR_MAPPINGS = {
  notifications: Notifications,
  friends: Friends,
  none: () => null,
} as const;

export const ICON_SIZE = 28;

type SidebarOptions = keyof typeof SIDEBAR_MAPPINGS;

const SidebarMenu = ({
  onChange,
  currentSelection,
}: {
  onChange: (selection: SidebarOptions) => void;
  currentSelection: SidebarOptions;
}) => (
  <div className="w-12 h-full py-4 flex flex-col items-center gap-8 bg-primary text-primary-content">
    <NotificationIcon
      selected={currentSelection === "notifications"}
      onClick={() => onChange("notifications")}
    />
    <FriendsIcon
      selected={currentSelection === "friends"}
      onClick={() => onChange("friends")}
    />
  </div>
);

const SidebarContainer = () => {
  const [selectedSidebar, setSelectedSidebar] =
    useState<SidebarOptions>("notifications");

  const handleChange = (selection: SidebarOptions) => {
    if (selection === selectedSidebar) {
      setSelectedSidebar("none");
    } else {
      setSelectedSidebar(selection);
    }
  };

  const Sidebar = SIDEBAR_MAPPINGS[selectedSidebar];

  return (
    <div className="bg-gray-200 text-black h-screen flex">
      <Sidebar />
      <SidebarMenu currentSelection={selectedSidebar} onChange={handleChange} />
    </div>
  );
};

export default SidebarContainer;
