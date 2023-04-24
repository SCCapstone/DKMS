"use client";

import { ErrorBoundary } from "react-error-boundary";

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
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div className="w-full md:w-64 max-h-screen h-screen overflow-y-scroll md:p-4 md:bg-neutral md:text-neutral-content">
        {title && (
          <>
            <h2 className="normal-case font-bold">{title}</h2>
            <div className="divider" />
          </>
        )}
        {children}
      </div>
    </ErrorBoundary>
  );
};

export default BasePanel;
