import { create } from "zustand";

import { THEMES } from "~/constants/themes";
import { Theme } from "~/types";

type Store = {
  sceneReady: boolean;
  setSceneReady: (ready: boolean) => void;

  appReady: boolean;
  setAppReady: (appReady: boolean) => void;

  theme: Theme;
  setTheme: (theme: Theme) => void;

  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;

  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
};

const store = (set) => ({
  sceneReady: false,
  setSceneReady: (ready) => set({ sceneReady: ready }),

  appReady: true,
  setAppReady: (appReady) => set({ appReady }),

  theme: THEMES[0],
  setTheme: (theme) => set({ theme }),

  soundEnabled: true,
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),

  isMenuOpen: false,
  setIsMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
});

export const useStore = create<Store>(store);
