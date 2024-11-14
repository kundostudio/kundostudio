import { useEffect } from "react";

import { useSound } from "~/hooks/useSound";
import { useStore } from "~/lib/store";

export function useBackgroundMusic(path: string) {
  const soundEnabled = useStore((state) => state.soundEnabled);
  const musicEnabled = useStore((state) => state.musicEnabled);

  const [playBackgroundMusic, { stop }] = useSound(path, { volume: 0.5 });

  useEffect(() => {
    if (soundEnabled && musicEnabled) {
      playBackgroundMusic();
    } else {
      stop();
    }
  }, [playBackgroundMusic, soundEnabled, musicEnabled, stop]);
}
