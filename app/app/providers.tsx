"use client";

import PlayerProvider from "@/components/Player/PlayerProvider";
import SidebarProvider from "@/components/Sidebar/SidebarProvider";

/* Providers */
const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <PlayerProvider>{children}</PlayerProvider>
  </SidebarProvider>
);

export default AppProviders;
