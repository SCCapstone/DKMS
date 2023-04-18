"use client";

import { useMemo, useState } from "react";

import PlayerContext from "./PlayerContext";

import type { PlayerContextType } from "./PlayerContext";

const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentDeviceId, setCurrentDeviceId] = useState<string | undefined>(
    undefined
  );
  const [visible, setVisible] = useState<boolean>(false);

  const playbackContextValue = useMemo(
    (): PlayerContextType => ({
      currentDeviceState: [currentDeviceId, setCurrentDeviceId],
      visibleState: [visible, setVisible],
    }),
    [currentDeviceId, visible]
  );

  return (
    <PlayerContext.Provider value={playbackContextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
