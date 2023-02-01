"use client";

import { SessionProvider } from "next-auth/react";
import { useState } from "react";

import SidebarContext from "../components/Sidebar/SidebarContext";

import type { SidebarOptions } from "../components/Sidebar/types";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const sidebarContextValue = useState<SidebarOptions>("friends");

  return (
    <SessionProvider>
      <SidebarContext.Provider value={sidebarContextValue}>
        {children}
      </SidebarContext.Provider>
    </SessionProvider>
  );
};

export default Providers;
