"use client";

import Player from "@/components/Player";
import { useSidebar } from "@/components/Sidebar/SidebarContext";

const PlaybackPanel = ({ accessToken }: { accessToken: string }) => {
  const [sidebar] = useSidebar();

  return (
    <div
      className={`w-full md:w-64 max-h-screen h-screen flex flex-col md:p-4 md:bg-gray-200 md:text-black ${
        sidebar === "playback" ? "" : "hidden"
      }`}
    >
      <div>
        <h2 className="normal-case font-bold">Playback</h2>
        <div className="divider" />
      </div>
      <div className="flex-grow flex flex-col justify-center">
        <Player accessToken={accessToken} />
      </div>
    </div>
  );
};

export default PlaybackPanel;
