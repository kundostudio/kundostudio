"use client";

import { useMediaQuery } from "@studio-freight/hamo";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { Button } from "~/components/button";
import { useSound } from "~/hooks/useSound";
import { useStore } from "~/lib/store";
import { cn } from "~/lib/utils";
// @ts-ignore
import openSound from "~/public/sounds/menu-open.mp3";

import styles from "./header.module.scss";
import { MeowLinkLogo } from "./logo";
import { Menu } from "./menu";
import { MenuTrigger } from "./menu/trigger";

export function Header() {
  const ref = useRef(null);
  const isMobileXS = useMediaQuery("(max-width: 640px)");
  const pathname = usePathname();
  const isMenuOpen = useStore((state) => state.isMenuOpen);
  const { setIsMenuOpen } = useStore.getState();

  const [playOpenSound] = useSound(openSound);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname, setIsMenuOpen]);

  const handleToggleMenu = () => {
    playOpenSound();
    setIsMenuOpen(!isMenuOpen);
  };

  if (isMobileXS) {
    const handleLogoClick = () => {
      if (pathname === "/") {
        setIsMenuOpen(false);
      }
    };
    return (
      <>
        <motion.header className={styles.header}>
          <MeowLinkLogo onClick={handleLogoClick} className={styles.mobileHome} />
          <MenuTrigger
            ref={ref}
            isOpen={isMenuOpen}
            className={styles.menuTrigger}
            onClick={handleToggleMenu}
          />
        </motion.header>
        <Menu isOpen={isMenuOpen} onItemClick={() => setIsMenuOpen(false)} />
      </>
    );
  }

  return (
    <motion.header className={styles.header}>
      <MeowLinkLogo className={cn(styles.button, styles.meowButton)} />
      <nav className={styles.nav}>
        <Button
          variant={pathname === "/leaderboard" ? "highlight" : "subtle"}
          href="/leaderboard"
          className={styles.button}
        >
          leaderboard
        </Button>
        {/* <Button
          variant={pathname === "/bridge" ? "highlight" : "subtle"}
          href="/bridge"
          className={styles.button}
        >
          bridge
        </Button> */}
        <Button
          variant={pathname === "/stake" ? "highlight" : "subtle"}
          href="/stake"
          className={styles.button}
        >
          stake
        </Button>
      </nav>
    </motion.header>
  );
}
