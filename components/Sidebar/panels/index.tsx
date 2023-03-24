import Friends from "./Friends";
import Notifications from "./Notifications";
import Playback from "./Playback/Playback";

const SidebarPanels = ({ isDesktop }: { isDesktop?: boolean }) => (
  <div className={isDesktop ? "hidden md:block" : "md:hidden"}>
    <Friends />
    {/* @ts-expect-error Next 13 handles async components */}
    <Notifications />
    <Playback />
  </div>
);

export default SidebarPanels;
