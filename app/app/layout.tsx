import Navbar from "@/components/Navigation";
import {
  DesktopSidebar,
  MobileSidebar,
  SidebarPanels,
} from "@/components/Sidebar";

import AppProviders from "./providers";

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <AppProviders>
    <div className="md:flex flex-row min-h-screen">
      <Navbar />

      <main role="main" className="container mx-auto p-4 md:px-8 flex-grow">
        <SidebarPanels />
        <MobileSidebar>{children}</MobileSidebar>
      </main>
      {/* @ts-expect-error Server Component */}
      <DesktopSidebar />
    </div>
  </AppProviders>
);

export default AppLayout;
