"use client";

import { useState } from "react";

import SidebarContext from "./SidebarContext";

import type { SidebarOptions } from "./types";

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  // TODO: This should be set back to "none"
  const sidebarContextValue = useState<SidebarOptions>("playback");

  return (
    <SidebarContext.Provider value={sidebarContextValue}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
