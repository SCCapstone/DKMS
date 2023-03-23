import Friends from "./Friends";
import Notifications from "./Notifications";

const SidebarPanels = ({ isDesktop }: { isDesktop?: boolean }) => (
  <div className={isDesktop ? "hidden md:block" : "md:hidden"}>
    <Friends />
    <Notifications />
  </div>
);

export default SidebarPanels;
