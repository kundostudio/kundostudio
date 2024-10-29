import { useEffect, useState } from "react";
import useSound from "use-sound";

import { THEMES } from "~/constants/themes";
import { useKeyPress } from "~/hooks/useKeyPress";
import { useStore } from "~/lib/store";
import { Theme } from "~/types";
// @ts-ignore
import themeSound from "~/public/sounds/theme.wav";

const updateThemeCSSVars = (theme: Theme) => {
  document.documentElement.style.setProperty("--current-color", theme.color);
  document.documentElement.style.setProperty("--current-light", theme.light);
  document.documentElement.style.setProperty("--current-shadow", theme.shadow);
};

export function useTheme() {
  const [themeIndex, setThemeIndex] = useState(0);
  const { setTheme } = useStore.getState();

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

  useKeyPress(["c", "C"], () => changeTheme("next"));
  useKeyPress(["ArrowUp"], () => changeTheme("prev"));
  useKeyPress(["ArrowDown"], () => changeTheme("next"));

  return {
    changeThemeBack: () => changeTheme("prev"),
    changeThemeNext: () => changeTheme("next"),
  };
}
