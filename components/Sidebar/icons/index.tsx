import { getDocs, query, where } from "firebase/firestore";

import { notificationsCol } from "@/lib/firestore";
import { getCurrentUser } from "@/lib/getUser";

import getSvg from "./getSvg";

import type { SidebarOptions } from "../types";

const DEFAULT_SIZE = 28;

const getData = async () => {
  const currentUser = await getCurrentUser();
  const q = query(notificationsCol, where("recipientId", "==", currentUser.id));
  return (await getDocs(q)).docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .reverse();
};

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

const NotificationsIcon = async ({
  selected,
  width = DEFAULT_SIZE,
  height = DEFAULT_SIZE,
  onClick,
}: IconProps) => {
  const data = await getData();
  return (
    <IconButton onClick={onClick}>
      {data.length === 0
        ? getSvg("notifications", { width, height, selected })
        : getSvg("notificationsAlert", { width, height, selected })}
    </IconButton>
  );
};

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
    {/* @ts-expect-error Server Component */}
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
export { FriendsIcon, NotificationsIcon, PlaybackIcon };
