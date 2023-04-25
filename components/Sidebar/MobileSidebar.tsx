"use client";

import { useSidebar } from "./SidebarContext";

/* Layout for sidebar on mobile */
const MobileSidebar = ({ children }: { children: React.ReactNode }) => {
  const [sidebar] = useSidebar();
  return (
    <div className={sidebar === "none" ? "" : "hidden md:block"}>
      {children}
    </div>
  );
};

export default MobileSidebar;
