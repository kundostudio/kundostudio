"use client";

import { useMediaQuery } from "@studio-freight/hamo";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "~/components/button";
import { cn } from "~/lib/utils";

import styles from "./header.module.scss";
import { MeowLinkLogo } from "./logo";
import { Menu } from "./menu";
import { MenuTrigger } from "./menu/trigger";

export function Header() {
  const isMobileXS = useMediaQuery("(max-width: 640px)");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  if (isMobileXS) {
    return (
      <>
        <motion.header className={styles.header}>
          <MeowLinkLogo className={styles.mobileHome} />
          <MenuTrigger
            isOpen={isMenuOpen}
            className={styles.menuTrigger}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
