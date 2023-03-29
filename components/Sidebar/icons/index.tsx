import getSvg from "./getSvg";

import type { SidebarOptions } from "../types";

const DEFAULT_SIZE = 28;

type IconProps = {
  width?: number;
  height?: number;
  selected?: boolean;
  onClick: () => void;
  notificationAlert?: boolean;
};

const IconButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button type="button" onClick={onClick} className="btn btn-ghost btn-circle">
    {children}
  </button>
);

const FriendsIcon = ({
  selected,
  width = DEFAULT_SIZE,
  height = DEFAULT_SIZE,
  notificationAlert = undefined,
  onClick,
}: IconProps) => (
  <IconButton onClick={onClick}>
    {getSvg("friends", { width, height, selected })}
  </IconButton>
);

const NotificationsIcon = ({
  selected,
  width = DEFAULT_SIZE,
  height = DEFAULT_SIZE,
  onClick,
  notificationAlert,
}: IconProps) => (
  <IconButton onClick={onClick}>
    {notificationAlert
      ? getSvg("notifications", { width, height, selected })
      : getSvg("notificationsAlert", { width, height, selected })}
  </IconButton>
);

const PlaybackIcon = ({
  selected,
  width = DEFAULT_SIZE,
  height = DEFAULT_SIZE,
  onClick,
  notificationAlert = undefined,
}: IconProps) => (
  <IconButton onClick={onClick}>
    {getSvg("playback", { width, height, selected })}
  </IconButton>
);

const SidebarIcons = ({
  onChange,
  currentSelection,
  notificationAlert,
}: {
  onChange: (selection: SidebarOptions) => void;
  currentSelection: SidebarOptions;
  notificationAlert?: boolean;
}) => (
  <>
    <NotificationsIcon
      selected={currentSelection === "notifications"}
      onClick={() => onChange("notifications")}
      notificationAlert={notificationAlert}
    />
    <FriendsIcon
      selected={currentSelection === "friends"}
      onClick={() => onChange("friends")}
    />
  </>
);

export default SidebarIcons;
export { FriendsIcon, NotificationsIcon, PlaybackIcon };
