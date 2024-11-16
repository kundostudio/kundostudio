import { useCallback, useEffect, useState } from "react";

import { THEMES } from "~/constants/themes";
import { useKeyPress } from "~/hooks/useKeyPress";
import { useStore } from "~/lib/store";
import { Theme } from "~/types";
// @ts-ignore
import themeSound from "~/public/sounds/theme.mp3";

import { useSound } from "./useSound";

const updateThemeCSSVars = (theme: Theme) => {
  document.documentElement.style.setProperty("--current-color", theme.color);
  document.documentElement.style.setProperty("--current-light", theme.light);
  document.documentElement.style.setProperty("--current-shadow", theme.shadow);
};

export function useTheme() {
  const [themeIndex, setThemeIndex] = useState(0);
  const { setTheme } = useStore.getState();
  const [lastGamepadUpdate, setLastGamepadUpdate] = useState(0);

  const [playThemeSound] = useSound(themeSound);

  useEffect(() => {
    updateThemeCSSVars(THEMES[0]);
  }, []);

  function changeTheme(direction: "next" | "prev") {
    playThemeSound();

    const nextThemeIndex =
      direction === "next"
        ? themeIndex === THEMES.length - 1
          ? 0
          : themeIndex + 1
        : themeIndex === 0
          ? THEMES.length - 1
          : themeIndex - 1;
    const nextTheme = THEMES[nextThemeIndex];

    setThemeIndex(nextThemeIndex);
    setTheme(nextTheme);
    updateThemeCSSVars(nextTheme);
  }

  // Manejo del gamepad para cambiar temas
  const handleGamepadInput = useCallback(() => {
    const gamepad = navigator.getGamepads()?.[0];
    if (!gamepad) return;

    const now = Date.now();
    const DEBOUNCE_TIME = 200;

    if (now - lastGamepadUpdate > DEBOUNCE_TIME) {
      // Eje vertical
      const axisV = gamepad.axes[1];

      // D-pad digital (botones 12 y 13)
      if (gamepad.buttons[12]?.pressed || axisV < -0.5) {
        // Arriba
        changeTheme("prev");
        setLastGamepadUpdate(now);
      } else if (gamepad.buttons[13]?.pressed || axisV > 0.5) {
        // Abajo
        changeTheme("next");
        setLastGamepadUpdate(now);
      }
    }
  }, [lastGamepadUpdate]);

  useEffect(() => {
    let animationFrameId: number;
    const pollGamepad = () => {
      handleGamepadInput();
      animationFrameId = requestAnimationFrame(pollGamepad);
    };
    pollGamepad();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [handleGamepadInput]);

  useKeyPress(["c", "C"], () => changeTheme("next"));
  useKeyPress(["ArrowUp"], () => changeTheme("prev"));
  useKeyPress(["ArrowDown"], () => changeTheme("next"));

  return {
    changeThemeBack: () => changeTheme("prev"),
    changeThemeNext: () => changeTheme("next"),
  };
}
