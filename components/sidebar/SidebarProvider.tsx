"use client";

import { useEffect, useMemo, useState } from "react";

import { getLocalStorage, setLocalStorage } from "../../lib/localStorage";

import SidebarContext from "./SidebarContext";
import { isSidebarOption } from "./types";

import type { SidebarOptions } from "./types";

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentSidebar, setCurrentSidebar] = useState<SidebarOptions>("none");

  useEffect(() => {
    const storedSidebar = getLocalStorage<string>("sidebar");

    if (isSidebarOption(storedSidebar)) {
      setCurrentSidebar(storedSidebar);
    }
  }, [setCurrentSidebar]);

  const handleSidebarChange = (option: SidebarOptions) => {
    setCurrentSidebar(option);
    setLocalStorage("sidebar", option);
  };

  const sidebarContextValue = useMemo(
    () => [currentSidebar, handleSidebarChange] as const,
    [currentSidebar]
  );
  return (
    <SidebarContext.Provider value={sidebarContextValue}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
