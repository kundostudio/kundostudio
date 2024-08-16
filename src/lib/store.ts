import { create } from "zustand";

type Store = {
  sceneReady: boolean;
  setSceneReady: (ready: boolean) => void;

  appReady: boolean;
  setAppReady: (appReady: boolean) => void;

  primaryColor: string;
  setPrimaryColor: (color: string) => void;
};

const store = (set) => ({
  sceneReady: false,
  setSceneReady: (ready) => set({ sceneReady: ready }),

  appReady: true,
  setAppReady: (appReady) => set({ appReady }),

  primaryColor: "rbg(212, 254, 0)",
  setPrimaryColor: (color) => set({ primaryColor: color }),
});

export const useStore = create<Store>(store);
