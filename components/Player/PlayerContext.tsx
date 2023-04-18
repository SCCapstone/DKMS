import { createContext, useContext } from "react";

import type { Dispatch, SetStateAction } from "react";

export type PlayerContextType = {
  currentDeviceState: [
    string | undefined,
    Dispatch<SetStateAction<string | undefined>>
  ];
  visibleState: [boolean, Dispatch<SetStateAction<boolean>>];
};
const PlayerContext = createContext<PlayerContextType>({
  currentDeviceState: [undefined, () => undefined],
  visibleState: [false, () => undefined],
});

export const usePlayer = () => useContext(PlayerContext);

export default PlayerContext;
