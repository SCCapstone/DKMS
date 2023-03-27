import Friends from "./Friends";
import Notifications from "./Notifications";
import Playback from "./Playback";

const SidebarPanels = ({ isDesktop }: { isDesktop?: boolean }) => {
  // Assume you have the following values for isTrackPlaying and uri
  const isTrackPlaying = false;
  const uri = "spotify:track:";
  return (
    <div className={isDesktop ? "hidden md:block" : "md:hidden"}>
      <Friends />
      {/* @ts-expect-error Next 13 handles async components */}
      <Notifications />
      <Playback
        isTrackPlaying={isTrackPlaying}
        uri={uri}
        isPremiumUser={false}
      />
    </div>
  );
};

export default SidebarPanels;
