import { HookOptions } from "node_modules/use-sound/dist/types";
import { useCallback } from "react";
import useSoundLib from "use-sound";

import { useStore } from "~/lib/store";

export function useSound(sound: string, options?: HookOptions) {
  const soundEnabled = useStore(useCallback((state) => state.soundEnabled, []));

  return useSoundLib(sound, {
    soundEnabled,
    ...options,
  });
}
