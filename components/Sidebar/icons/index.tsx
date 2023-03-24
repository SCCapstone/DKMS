import getSvg from "./getSvg";

import type { SidebarOptions } from "../types";

const DEFAULT_SIZE = 28;

type IconProps = {
  width?: number;
  height?: number;
  selected?: boolean;
  onClick: () => void;
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
}: IconProps) => (
  <IconButton onClick={onClick}>
    {getSvg("notifications", { width, height, selected })}
  </IconButton>
);

const PlaybackIcon = ({
  selected,
  width = DEFAULT_SIZE,
  height = DEFAULT_SIZE,
  onClick,
}: IconProps) => (
  <IconButton onClick={onClick}>
    {getSvg("playback", { width, height, selected })}
  </IconButton>
);

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
    <PlaybackIcon
      selected={currentSelection === "playback"}
      onClick={() => onChange("playback")}
    />
  </>
);

export default SidebarIcons;
export { FriendsIcon, NotificationsIcon, PlaybackIcon };
