"use client";

import { useState } from "react";

import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { useKeyPress } from "~/hooks/useKeyPress";
import { cn } from "~/lib/utils";
import ConsoleBottom from "~/public/console-bottom.svg";
import ConsoleTop from "~/public/console-top.svg";

import styles from "./app.module.scss";

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

  useKeyPress(["c", "C"], () => {
    setThemeIndex((prevIndex) => (prevIndex + 1) % colors.length);
    document.documentElement.style.setProperty("--current-color", colors[themeIndex].color);
  });
  return (
    <div className={styles.wrapper}>
      <ConsoleTop className="absolute top-0" />
      <div className={styles.content}>
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
      <ConsoleBottom className="absolute bottom-0" />
    </div>
  );
}
