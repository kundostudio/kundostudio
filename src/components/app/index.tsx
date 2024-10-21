"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";

import { Console } from "~/components/console";
import { Header } from "~/components/header";
import { Line } from "~/components/Line";
import { Variations } from "~/components/variations";
import { THEMES } from "~/constants/themes";
import { useKeyPress } from "~/hooks/useKeyPress";
import { useStore } from "~/lib/store";

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

  useKeyPress(["c", "C"], () => {
    setThemeIndex((prevIndex) => (prevIndex + 1) % THEMES.length);
    setTheme(THEMES[themeIndex]);

    document.documentElement.style.setProperty("--current-color", THEMES[themeIndex].color);
    document.documentElement.style.setProperty("--current-layer", THEMES[themeIndex].layer);
    document.documentElement.style.setProperty("--current-light", THEMES[themeIndex].light);
  });

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
