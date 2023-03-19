export type SidebarOptions =
  | "friends"
  | "notifications"
  | "recommendations"
  | "playback"
  | "none";

export const isSidebarOption = (
  option: string | null
): option is SidebarOptions =>
  !!option &&
  ["friends", "notifications", "recommendations", "playback", "none"].includes(
    option
  );
