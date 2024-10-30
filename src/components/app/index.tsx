"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { Console } from "~/components/console";
import { Header } from "~/components/header";
import { Line } from "~/components/Line";
import { Variations } from "~/components/variations";
import { useControls } from "~/hooks/useControls";
import { useSound } from "~/hooks/useSound";
import { useTheme } from "~/hooks/useTheme";
// @ts-ignore
import pageSound from "~/public/sounds/page.mp3";

import styles from "./app.module.scss";

const Canvas = dynamic(() => import("./canvas").then((mod) => mod.Canvas), {
  ssr: false,
});

type Props = {
  children: React.ReactNode;
};

export function App({ children }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [playPageSound] = useSound(pageSound);

  const { focusBack, focusNext } = useControls();
  const { changeThemeBack, changeThemeNext } = useTheme();

  useEffect(() => {
    playPageSound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Console
      className={styles.console}
      onPressUp={changeThemeBack}
      onPressDown={changeThemeNext}
      onPressLeft={focusBack}
      onPressRight={focusNext}
    >
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
