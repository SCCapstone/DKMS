"use client";

import { useSidebar } from "@/components/Sidebar/SidebarContext";

import Player from "./Player";

const PlaybackPanel = ({ accessToken }: { accessToken: string }) => {
  const [sidebar] = useSidebar();
  const isCurrentSidebar = sidebar === "playback";

  return (
    <div
      className={`w-full md:w-64 max-h-screen h-screen flex flex-col md:p-4 md:bg-gray-200 md:text-black ${
        isCurrentSidebar ? "" : "hidden"
      }`}
    >
      <div>
        <h2 className="normal-case font-bold">Playback</h2>
        <div className="divider" />
      </div>
      <div className="pt-8">
        <Player accessToken={accessToken} />
      </div>
    </div>
  );
};

export default PlaybackPanel;
