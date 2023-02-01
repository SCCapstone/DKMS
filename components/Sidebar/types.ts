export type SidebarOptions = "friends" | "notifications" | "playback" | "none";

export const isSidebarOption = (
  option: string | null
): option is SidebarOptions =>
  !!option && ["friends", "notifications", "playback", "none"].includes(option);
