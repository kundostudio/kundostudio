"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { Console } from "~/components/console";
import { Header } from "~/components/header";
import { Line } from "~/components/Line";
import { Variations } from "~/components/variations";
import { THEMES } from "~/constants/themes";
import { useKeyPress } from "~/hooks/useKeyPress";
import { useStore } from "~/lib/store";
import { Theme } from "~/types";

import styles from "./app.module.scss";
const Canvas = dynamic(() => import("./canvas").then((mod) => mod.Canvas), {
  ssr: false,
});

type Props = {
  children: React.ReactNode;
};

export function App({ children }: Props) {
  const [themeIndex, setThemeIndex] = useState(0);
  const { setTheme } = useStore.getState();

  const contentRef = useRef<HTMLDivElement>(null);

  const updateThemeCSSVars = (theme: Theme) => {
    document.documentElement.style.setProperty("--current-color", theme.color);
    document.documentElement.style.setProperty("--current-layer", theme.layer);
    document.documentElement.style.setProperty("--current-light", theme.light);
    document.documentElement.style.setProperty("--current-shadow", theme.shadow);
  };

  useKeyPress(["c", "C"], () => {
    const nextThemeIndex = (themeIndex + 1) % THEMES.length;
    const nextTheme = THEMES[nextThemeIndex];

    setThemeIndex(nextThemeIndex);
    setTheme(nextTheme);
    updateThemeCSSVars(nextTheme);
  });

  useEffect(() => {
    updateThemeCSSVars(THEMES[0]);
  }, []);

  return (
    <Console className={styles.console}>
      <div ref={contentRef} className={styles.content}>
        <Canvas />

        <Line direction="vertical" className={styles.verticalLeftLine} />
        <Line direction="horizontal" className={styles.headerTopLine} />
        <Header />
        <Line direction="horizontal" className={styles.headerBottomLine} />

        <Line direction="horizontal" className={styles.variationsTopLine} />
        <Variations className={styles.variations} />
        <Line direction="horizontal" className={styles.variationsBottomLine} />

        {children}
        <Line direction="horizontal" className={styles.footerBottomLine} />
        <Line direction="vertical" className={styles.verticalRightLine} />
      </div>
    </Console>
  );
}
