"use client";

import { useMediaQuery } from "@studio-freight/hamo";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

import { Coins } from "~/components/coins";
import { Console } from "~/components/console";
import { DialogProvider } from "~/components/dialog";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { Line } from "~/components/Line";
import { useBackgroundMusic } from "~/hooks/useBackgroundMusic";
import { useControls } from "~/hooks/useControls";
import { useSound } from "~/hooks/useSound";
import { useTheme } from "~/hooks/useTheme";
// @ts-ignore
import pageSound from "~/public/sounds/page.mp3";
// @ts-ignore
import music from "~/public/music/cyberpunk.mp3";

import { TopStripes } from "../console/top-stripes";

import styles from "./app.module.scss";

const Canvas = dynamic(() => import("./canvas").then((mod) => mod.Canvas), {
  ssr: false,
});

type Props = {
  children: React.ReactNode;
};

export function App({ children }: Props) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const pathname = usePathname();
  const [playPageChangeSound, { stop }] = useSound(pageSound);

  const { focusBack, focusNext, select, unselect } = useControls();
  const { changeThemeBack, changeThemeNext } = useTheme();

  useBackgroundMusic(music);

  const handlePageSound = useCallback(() => {
    playPageChangeSound();
  }, [playPageChangeSound]);

  useEffect(() => {
    handlePageSound();
    return () => stop();
  }, [pathname, handlePageSound, stop]);

  const consoleHandlers = useMemo(
    () => ({
      onPressUp: changeThemeBack,
      onPressDown: changeThemeNext,
      onPressLeft: focusBack,
      onPressRight: focusNext,
      onPressSelect: select,
      onPressUnselect: unselect,
    }),
    [changeThemeBack, changeThemeNext, focusBack, focusNext, select, unselect]
  );

  return (
    <>
      <TopStripes className={styles.topStripes} />
      <Console className={styles.console} {...consoleHandlers}>
        <div className={styles.content}>
          <Canvas />
          <Line direction="vertical" className={styles.verticalLeftLine} />
          <Line direction="horizontal" className={styles.headerTopLine} />
          <Header />
          <Line direction="horizontal" className={styles.headerBottomLine} />
          <Line direction="horizontal" className={styles.variationsTopLine} />
          <Coins className={styles.variations} />
          <Line direction="horizontal" className={styles.variationsBottomLine} />
          {children}
          <Line direction="horizontal" className={styles.footerBottomLine} />
          <Line direction="vertical" className={styles.verticalRightLine} />
          <Line direction="horizontal" className={styles.footerTopLine} />
          {!isMobile && <Footer />}
          <DialogProvider />
        </div>
      </Console>
    </>
  );
}
