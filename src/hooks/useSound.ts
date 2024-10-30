import { HookOptions } from "node_modules/use-sound/dist/types";
import useSoundLib from "use-sound";

import { useStore } from "~/lib/store";

export function useSound(sound: string, options?: HookOptions) {
  const soundEnabled = useStore((state) => state.soundEnabled);

  return useSoundLib(sound, { soundEnabled, ...options });
}
