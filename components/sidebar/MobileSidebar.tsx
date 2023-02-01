"use client";

import SidebarPanels from "./panels";
import { useSidebar } from "./SidebarContext";

const MobileSidebar = ({ children }: { children: React.ReactNode }) => {
  const [currentSidebar] = useSidebar();

  if (currentSidebar !== "none") {
    return (
      <>
        <div className="md:hidden">
          <SidebarPanels />
        </div>
        <div className="hidden md:block">{children}</div>
      </>
    );
  }

  return <div>{children}</div>;
};

export default MobileSidebar;
