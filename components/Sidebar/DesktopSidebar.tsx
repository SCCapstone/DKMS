import SidebarPanels from "./panels";
import SidebarMenu from "./SidebarMenu";

const DesktopSidebar = () => (
  <div className="hidden md:flex h-100% sticky top-0">
    <div className="h-screen sticky top-0 overflow-y-scroll">
      <SidebarPanels />
    </div>
    <div className="w-12 h-100% flex-col items-center gap-8 bg-primary text-primary-content">
      <div className="flex flex-col h-screen sticky top-0">
        <SidebarMenu />
      </div>
    </div>
  </div>
);

export default DesktopSidebar;
