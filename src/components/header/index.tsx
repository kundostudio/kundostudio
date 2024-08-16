"use client";

import { useMediaQuery } from "@studio-freight/hamo";
import { motion } from "framer-motion";
import { useState } from "react";

import { Button } from "~/components/button";
import { useStore } from "~/lib/store";

import styles from "./header.module.scss";
import { LinkLogo } from "./link-logo";
import { Menu } from "./menu";

export function Header() {
  const appReady = useStore((s) => s.appReady);
  const isMobileXS = useMediaQuery("(max-width: 640px)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <motion.header className={styles.header}>
        <LinkLogo />
        <nav className={styles.nav}>
          <Button href="/chain" className={styles.button}>
            chain
          </Button>
          <Button href="/airdrop" className={styles.button}>
            airdrop
          </Button>
          <Button href="/leaderboard" className={styles.button}>
            leaderboard
          </Button>
          <Button href="/join" variant="highlight" className={styles.button}>
            join airdrop
          </Button>
        </nav>
      </motion.header>
      {isMobileXS && <Menu isOpen={isMenuOpen} />}
    </>
  );
}
