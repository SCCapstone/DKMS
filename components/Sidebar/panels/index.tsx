import Friends from "./Friends";
import Notifications from "./Notifications";

const SidebarPanels = ({ isDesktop }: { isDesktop?: boolean }) => (
  <div className={isDesktop ? "hidden md:block" : "md:hidden"}>
    {/* @ts-expect-error Next 13 handles async components */}
    <Friends />
    {/* @ts-expect-error Next 13 handles async components */}
    <Notifications />
  </div>
);

export default SidebarPanels;
