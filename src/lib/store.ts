import { create } from "zustand";

import { DialogTypeProps } from "~/types";

type Store = {
  appReady: boolean;
  setAppReady: (appReady: boolean) => void;

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
  appReady: true,
  setAppReady: (appReady) => set({ appReady }),

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
