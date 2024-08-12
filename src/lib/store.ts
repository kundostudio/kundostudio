import { create } from "zustand";

type Store = {
  sceneReady: boolean;
  setSceneReady: (ready: boolean) => void;

  appReady: boolean;
  setAppReady: (appReady: boolean) => void;
};

const store = (set) => ({
  sceneReady: false,
  setSceneReady: (ready) => set({ sceneReady: ready }),

  appReady: true,
  setAppReady: (appReady) => set({ appReady }),
});

export const useStore = create<Store>(store);
