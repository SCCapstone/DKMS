"use client";

import { SessionProvider } from "next-auth/react";

import SidebarProvider from "../components/Sidebar/SidebarProvider";

const Providers = ({ children }: { children: React.ReactNode }) => (
  <SessionProvider>
    <SidebarProvider>{children}</SidebarProvider>
  </SessionProvider>
);

export default Providers;
