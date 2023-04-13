"use client";

import SidebarProvider from "@/components/Sidebar/SidebarProvider";

const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>{children}</SidebarProvider>
);

export default AppProviders;
