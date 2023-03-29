import Friends from "./Friends";
import Notifications from "./Notifications";
import Playback from "./Playback";

const SidebarPanels = ({ isDesktop }: { isDesktop?: boolean }) => (
  <div className={isDesktop ? "hidden md:block" : "md:hidden"}>
    {/* @ts-expect-error Next 13 handles async components */}
    <Friends />
    {/* @ts-expect-error Next 13 handles async components */}
    <Notifications />
    <Playback />
  </div>
);

export default SidebarPanels;
