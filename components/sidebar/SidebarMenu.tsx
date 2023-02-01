import { FriendsIcon, NotificationsIcon } from "./icons";

import type { SidebarOptions } from "./types";

const SidebarMenu = ({
  onChange,
  currentSelection,
}: {
  onChange: (selection: SidebarOptions) => void;
  currentSelection: SidebarOptions;
}) => (
  <div>
    <NotificationsIcon
      selected={currentSelection === "notifications"}
      onClick={() => onChange("notifications")}
    />
    <FriendsIcon
      selected={currentSelection === "friends"}
      onClick={() => onChange("friends")}
    />
  </div>
);

export default SidebarMenu;
