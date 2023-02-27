"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { themeChange } from "theme-change";

import SidebarProvider from "../components/Sidebar/SidebarProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <SessionProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </SessionProvider>
  );
};

export default Providers;
