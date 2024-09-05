"use client";

import { useMediaQuery } from "@studio-freight/hamo";
import { motion } from "framer-motion";
import { useState } from "react";

import { Button } from "~/components/button";
import { useStore } from "~/lib/store";
import FullLogo from "~/public/logo-full.svg";
import SmallLogo from "~/public/logo.svg";

import styles from "./header.module.scss";
import { Menu } from "./menu";

export function Header() {
  const appReady = useStore((s) => s.appReady);
  const isMobileXS = useMediaQuery("(max-width: 640px)");
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <motion.header className={styles.header}>
        <Button href="/" variant="highlight" className={styles.button}>
          <span className={styles.linkLogo}>
            {isMobile ? (
              <SmallLogo className={styles.logo} />
            ) : (
              <FullLogo className={styles.logo} />
            )}
          </span>
        </Button>
        <nav className={styles.nav}>
          <Button variant="highlight" href="/leaderboard" className={styles.button}>
            leaderboard
          </Button>
        </nav>
      </motion.header>
      {isMobileXS && <Menu isOpen={isMenuOpen} />}
    </>
  );
}
