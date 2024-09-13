"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { Console } from "~/components/console/console";
import { Header } from "~/components/header";
import { Line } from "~/components/Line";
import { Variations } from "~/components/variations";
import { useKeyPress } from "~/hooks/useKeyPress";
import { useStore } from "~/lib/store";

import styles from "./app.module.scss";
const Canvas = dynamic(() => import("./canvas").then((mod) => mod.Canvas), {
  ssr: false,
});

type Props = {
  children: React.ReactNode;
};

const colors = [
  {
    name: "stereo",
    color: "212, 254, 0",
  },
  {
    name: "grid",
    color: "255, 255, 255",
  },
  {
    name: "horizon",
    color: "128, 233, 255",
  },
  {
    name: "wave",
    color: "180, 130, 255",
  },
];

export function App({ children }: Props) {
  const [themeIndex, setThemeIndex] = useState(0);
  const { setPrimaryColor } = useStore.getState();

  const contentRef = useRef<HTMLDivElement>(null);

  useKeyPress(["c", "C"], () => {
    setThemeIndex((prevIndex) => (prevIndex + 1) % colors.length);
    setPrimaryColor(`rgb(${colors[themeIndex].color})`);
    document.documentElement.style.setProperty("--current-color", colors[themeIndex].color);
  });

  useEffect(() => {
    setPrimaryColor(`rgb(${colors[themeIndex].color})`);
  }, []);

  return (
    <Console className={styles.console}>
      <div ref={contentRef} className={styles.content}>
        <Canvas>
          {/* {method === "uikit" ? <UIKitScene /> : <Scene texture={texture} />} */}
          {/* <PostProcessing /> */}
        </Canvas>

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
