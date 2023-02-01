import { FriendsIcon, NotificationsIcon } from "./icons";

import type { SidebarOptions } from "./types";

const SidebarIcons = ({
  onChange,
  currentSelection,
}: {
  onChange: (selection: SidebarOptions) => void;
  currentSelection: SidebarOptions;
}) => (
  <>
    <NotificationsIcon
      selected={currentSelection === "notifications"}
      onClick={() => onChange("notifications")}
    />
    <FriendsIcon
      selected={currentSelection === "friends"}
      onClick={() => onChange("friends")}
    />
  </>
);

export default SidebarIcons;
