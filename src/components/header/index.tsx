"use client";

import { useMediaQuery } from "@studio-freight/hamo";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "~/components/button";
import BackgroundLogo from "~/public/big-meow-background.svg";
import FullLogo from "~/public/logo-full.svg";
import SmallLogo from "~/public/logo.svg";

import { Link } from "../link";

import styles from "./header.module.scss";
import { Menu } from "./menu";
import { MenuTrigger } from "./menu/trigger";

export function Header() {
  const isMobileXS = useMediaQuery("(max-width: 640px)");
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  if (isMobileXS) {
    return (
      <>
        <motion.header className={styles.header}>
          <Link href="/" className={styles.mobileHome}>
            <BackgroundLogo className={styles.logoBackground} />
            <SmallLogo className={styles.logo} />
          </Link>
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
      <Button href="/" variant="highlight" className={styles.button}>
        <span className={styles.linkLogo}>
          {isMobile ? <SmallLogo className={styles.logo} /> : <FullLogo className={styles.logo} />}
        </span>
      </Button>
      <nav className={styles.nav}>
        <Button variant="highlight" href="/leaderboard" className={styles.button}>
          leaderboard
        </Button>
      </nav>
    </motion.header>
  );
}
