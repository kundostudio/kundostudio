"use client";

import { useMediaQuery } from "@studio-freight/hamo";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

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
    return (
      <>
        <motion.header className={styles.header}>
          <MeowLinkLogo className={styles.mobileHome} />
          <MenuTrigger
            isOpen={isMenuOpen}
            className={styles.menuTrigger}
            onClick={handleToggleMenu}
          />
        </motion.header>
        <Menu isOpen={isMenuOpen} />
      </>
    );
  }

  return (
    <motion.header className={styles.header}>
      <MeowLinkLogo className={cn(styles.button, styles.meowButton)} />
      <nav className={styles.nav}>
        <Button variant="highlight" href="/leaderboard" className={styles.button}>
          leaderboard
        </Button>
      </nav>
    </motion.header>
  );
}
