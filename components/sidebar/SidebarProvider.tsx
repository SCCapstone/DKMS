"use client";

import { useState } from "react";

import SidebarContext from "./SidebarContext";

import type { SidebarOptions } from "./types";

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const sidebarContextValue = useState<SidebarOptions>("notifications");

  return (
    <SidebarContext.Provider value={sidebarContextValue}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
