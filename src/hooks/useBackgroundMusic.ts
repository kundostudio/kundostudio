import { useEffect } from "react";

import { useSound } from "~/hooks/useSound";
import { useStore } from "~/lib/store";

export function useBackgroundMusic(path: string) {
  const soundEnabled = useStore((state) => state.soundEnabled);
  const [playBackgroundMusic, { stop }] = useSound(path, { volume: 1 });

  useEffect(() => {
    if (soundEnabled) {
      playBackgroundMusic();
    } else {
      stop();
    }
  }, [playBackgroundMusic, soundEnabled, stop]);
}
