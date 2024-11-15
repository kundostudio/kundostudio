import { useCallback, useEffect } from "react";

import { useSound } from "~/hooks/useSound";
import { useStore } from "~/lib/store";

export function useBackgroundMusic(path: string) {
  const soundEnabled = useStore((state) => state.soundEnabled);
  const musicEnabled = useStore((state) => state.musicEnabled);
  const isMenuOpen = useStore(useCallback((state) => state.isMenuOpen, []));

  const [playBackgroundMusic, { stop }] = useSound(path, {
    playbackRate: isMenuOpen ? 0.95 : 1,
    volume: isMenuOpen ? 0.4 : 0.5,
  });

  useEffect(() => {
    if (soundEnabled && musicEnabled) {
      playBackgroundMusic();
    } else {
      stop();
    }
  }, [playBackgroundMusic, soundEnabled, musicEnabled, stop]);
}
