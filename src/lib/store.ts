import { create } from "zustand";

import { THEMES } from "~/constants/themes";
import { DialogTypeProps, Theme } from "~/types";

type Store = {
  sceneReady: boolean;
  setSceneReady: (ready: boolean) => void;

  appReady: boolean;
  setAppReady: (appReady: boolean) => void;

  theme: Theme;
  setTheme: (theme: Theme) => void;

  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;

  musicEnabled: boolean;
  setMusicEnabled: (enabled: boolean) => void;

  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;

  dialogs: Record<string, DialogTypeProps>;
  dialog: DialogTypeProps | {};
  dialogIsOpen: boolean;
  addDialog: (key: string, dialog: DialogTypeProps) => void;
  removeDialog: (key: string) => void;
  setDialogOpen: (key: string, open: boolean) => void;
  setIsOpen: (open: boolean) => void;
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

  musicEnabled: false,
  setMusicEnabled: (enabled) => set({ musicEnabled: enabled }),

  isMenuOpen: false,
  setIsMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),

  dialogs: {},
  dialog: {},
  dialogIsOpen: false,
  addDialog: (key, dialog) => {
    set((state) => ({ dialogs: { ...state.dialogs, [key]: dialog } }));
  },
  removeDialog: (key) => {
    return set((state) => {
      const dialogs = { ...state.dialogs };
      delete dialogs[key];
      return { dialogs };
    });
  },
  setDialogOpen: (key, open) => {
    if (open) {
      return set((state) => ({ dialog: state.dialogs[key], dialogIsOpen: true }));
    } else {
      return set({ dialog: {}, dialogIsOpen: false });
    }
  },
  setIsOpen: (open) => set({ dialogIsOpen: open }),
});

export const useStore = create<Store>(store);
