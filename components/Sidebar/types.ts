const SIDEBAR_OPTIONS = [
  "friends",
  "notifications",
  "notificationsAlert",
  "playback",
  "queue",
  "none",
] as const;

export type SidebarOptions = (typeof SIDEBAR_OPTIONS)[number];

export const isSidebarOption = (
  option: string | null
): option is SidebarOptions =>
  !!option && SIDEBAR_OPTIONS.includes(option as SidebarOptions);
