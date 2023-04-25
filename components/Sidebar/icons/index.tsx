import getSvg from "./getSvg";

import type { SidebarOptions } from "../types";

const DEFAULT_SIZE = 28;

/* Icons for each sidebar icon */

/* Props for each sidebar icon */
type IconProps = {
  width?: number;
  height?: number;
  selected?: boolean;
  onClick: () => void;
};

type NotificationsIconProps = {
  notificationAlert?: boolean;
} & IconProps;

const IconButton = ({
  children,
  onClick,
  id,
}: {
  children: React.ReactNode;
  onClick: () => void;
  id?: string;
}) => (
  <button
    id={id}
    type="button"
    onClick={onClick}
    className="btn btn-ghost btn-circle"
  >
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
  notificationAlert,
}: NotificationsIconProps) => (
  <IconButton id="notificationsButton" onClick={onClick}>
    {notificationAlert
      ? getSvg("notificationsAlert", { width, height, selected })
      : getSvg("notifications", { width, height, selected })}
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
const QueueIcon = ({
  selected,
  width = DEFAULT_SIZE,
  height = DEFAULT_SIZE,
  onClick,
}: IconProps) => (
  <IconButton onClick={onClick}>
    {getSvg("queue", { width, height, selected })}
  </IconButton>
);

const SidebarIcons = ({
  onChange,
  currentSelection,
  notificationAlert,
  isPremium,
}: {
  onChange: (selection: SidebarOptions) => void;
  currentSelection: SidebarOptions;
  notificationAlert?: boolean;
  isPremium?: boolean;
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
    {isPremium && (
      <>
        <PlaybackIcon
          selected={currentSelection === "playback"}
          onClick={() => onChange("playback")}
        />
        <QueueIcon
          selected={currentSelection === "queue"}
          onClick={() => onChange("queue")}
          width={20}
          height={20}
        />
      </>
    )}
  </>
);

export default SidebarIcons;
export { FriendsIcon, NotificationsIcon, PlaybackIcon };
