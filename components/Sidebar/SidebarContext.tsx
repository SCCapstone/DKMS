import { createContext, useContext } from "react";

import type { SidebarOptions } from "./types";

const SidebarContext = createContext<
  readonly [SidebarOptions, (sidebar: SidebarOptions) => void]
>(["none", () => undefined]);

export const useSidebar = () => useContext(SidebarContext);

export default SidebarContext;
