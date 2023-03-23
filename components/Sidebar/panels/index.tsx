import Friends from "./Friends";
import Notifications from "./Notifications";
import Recommendations from "./Recommendations";

const SidebarPanels = ({ isDesktop }: { isDesktop?: boolean }) => (
  <div className={isDesktop ? "hidden md:block" : "md:hidden"}>
    <Friends />
    {/* @ts-expect-error Next 13 handles async components */}
    <Notifications />
    {/* @ts-expect-error Server Component */}
    <Recommendations />
  </div>
);

export default SidebarPanels;
