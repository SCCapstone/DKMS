"use client";

import dynamic from "next/dynamic";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import SidebarProvider from "@/components/Sidebar/SidebarProvider";
import { THEME_VALUES } from "@/lib/theme";

const Toaster = dynamic(
  async () => {
    const { Toaster: BaseToaster } = await import("react-hot-toast");
    return BaseToaster;
  },
  {
    ssr: false,
  }
);

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
