import { HookOptions } from "node_modules/use-sound/dist/types";
import { useCallback } from "react";
import useSoundLib from "use-sound";

import { useStore } from "~/lib/store";

export function useSound(sound: string, options?: HookOptions) {
  const soundEnabled = useStore(useCallback((state) => state.soundEnabled, []));
  const isMenuOpen = useStore(useCallback((state) => state.isMenuOpen, []));

  return useSoundLib(sound, {
    soundEnabled,
    ...options,
    playbackRate: isMenuOpen ? 0.95 : 1,
    volume: isMenuOpen ? 0.7 : 1,
  });
}
