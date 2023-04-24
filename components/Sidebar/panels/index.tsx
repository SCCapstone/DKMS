import ErrorBoundary from "@/components/ErrorBoundary";
import Queue from "@/components/Sidebar/panels/Queue";

import Friends from "./Friends";
import Notifications from "./Notifications";
import Playback from "./Playback";

const SidebarPanels = ({ isDesktop }: { isDesktop?: boolean }) => (
  <div className={isDesktop ? "hidden md:block" : "md:hidden"}>
    <ErrorBoundary title="Friends" sidebarId="friends">
      {/* @ts-expect-error Next 13 handles async components */}
      <Friends />
    </ErrorBoundary>
    <ErrorBoundary title="Notifications" sidebarId="notifications">
      {/* @ts-expect-error Next 13 handles async components */}
      <Notifications />
    </ErrorBoundary>
    <ErrorBoundary title="Playback" sidebarId="playback">
      {/* @ts-expect-error Next 13 handles async components */}
      <Playback />
    </ErrorBoundary>
    <ErrorBoundary title="Queue" sidebarId="queue">
      {/* @ts-expect-error Next 13 handles async components */}
      <Queue />
    </ErrorBoundary>
  </div>
);

export default SidebarPanels;
