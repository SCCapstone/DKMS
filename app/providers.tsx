"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import SidebarProvider from "@/components/Sidebar/SidebarProvider";
import { THEME_VALUES } from "@/lib/theme";

const Providers = ({ children }: { children: React.ReactNode }) => (
  <SessionProvider>
    <SidebarProvider>
      <ThemeProvider themes={[...THEME_VALUES]}>{children}</ThemeProvider>
    </SidebarProvider>
  </SessionProvider>
);

export default Providers;
