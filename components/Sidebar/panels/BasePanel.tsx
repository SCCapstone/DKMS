"use client";

import { useSidebar } from "../SidebarContext";

import type { SidebarOptions } from "../types";

const BasePanel = ({
  sidebarId,
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
  sidebarId: SidebarOptions;
}) => {
  const [sidebar] = useSidebar();

  if (sidebar !== sidebarId) return null;
  return (
    <div className="w-full md:w-64 min-h-screen h-100% md:p-4 md:bg-base-300 md:text-base-content">
      {title && (
        <>
          <h2 className="normal-case font-bold">{title}</h2>
          <div className="divider" />
        </>
      )}
      {children}
    </div>
  );
};

export default BasePanel;
