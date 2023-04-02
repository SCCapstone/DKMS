import Queue from "@/components/Sidebar/panels/Queue";

import Friends from "./Friends";
import Notifications from "./Notifications";
import Playback from "./Playback";

const SidebarPanels = ({ isDesktop }: { isDesktop?: boolean }) => (
  <div className={isDesktop ? "hidden md:block" : "md:hidden"}>
    {/* @ts-expect-error Next 13 handles async components */}
    <Friends />
    {/* @ts-expect-error Next 13 handles async components */}
    <Notifications />
    {/* @ts-expect-error Next 13 handles async components */}
    <Playback />
    {/* @ts-expect-error Next 13 handles async components */}
    <Queue />
  </div>
);

export default SidebarPanels;
