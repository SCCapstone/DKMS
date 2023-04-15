"use client";

import dynamic from "next/dynamic";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

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

const GlobalProviders = ({ children }: { children: React.ReactNode }) => (
  <SessionProvider>
    <ThemeProvider disableTransitionOnChange themes={[...THEME_VALUES]}>
      <Toaster />
      {children}
    </ThemeProvider>
  </SessionProvider>
);

export default GlobalProviders;
