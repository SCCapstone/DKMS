"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

import SidebarProvider from "@/components/Sidebar/SidebarProvider";
import { THEME_VALUES } from "@/lib/theme";

const Providers = ({ children }: { children: React.ReactNode }) => (
  <SessionProvider>
    <SidebarProvider>
      <ThemeProvider disableTransitionOnChange themes={[...THEME_VALUES]}>
        <Toaster />
        {children}
      </ThemeProvider>
    </SidebarProvider>
  </SessionProvider>
);

export default Providers;
