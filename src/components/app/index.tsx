"use client";

import html2canvas from "html2canvas";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { useKeyPress } from "~/hooks/useKeyPress";
import { cn } from "~/lib/utils";
import ConsoleBottom from "~/public/console-bottom.svg";
import ConsoleTop from "~/public/console-top.svg";

import styles from "./app.module.scss";
import { PostProcessing } from "./postprocessing";
import { Scene } from "./scene";
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

  const contentRef = useRef<HTMLDivElement>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useKeyPress(["c", "C"], () => {
    setThemeIndex((prevIndex) => (prevIndex + 1) % colors.length);
    document.documentElement.style.setProperty("--current-color", colors[themeIndex].color);
  });

  useEffect(() => {
    if (contentRef.current) {
      html2canvas(contentRef.current).then((canvas) => {
        const newTexture = new THREE.Texture(canvas);
        newTexture.needsUpdate = true;
        setTexture(newTexture);

        contentRef.current!.style.display = "none";
      });
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <ConsoleTop className="absolute top-0" />
      <div ref={contentRef} className={styles.content}>
        <div className={cn(styles.lineVertical, styles.verticalLeftLine)} />
        <div className={cn(styles.lineHorizontal, styles.headerTopLine)} />
        <Header />
        <div className={cn(styles.lineHorizontal, styles.headerBottomLine)} />
        {children}
        <div className={cn(styles.lineHorizontal, styles.footerTopLine)} />
        <Footer />
        <div className={cn(styles.lineHorizontal, styles.footerBottomLine)} />
        <div className={cn(styles.lineVertical, styles.verticalRightLine)} />
      </div>
      <Canvas>
        <Scene texture={texture} />
        <PostProcessing />
      </Canvas>
      <ConsoleBottom className="absolute bottom-0" />
    </div>
  );
}
