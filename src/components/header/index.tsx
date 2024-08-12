"use client";

import { useMediaQuery } from "@studio-freight/hamo";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { useState } from "react";

import { Button } from "~/components/button";
import { useStore } from "~/lib/store";
import FullLogo from "~/public/logo-full.svg";
import Logo from "~/public/logo.svg";

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
        <NextLink href="/" className={styles.logoWrapper}>
          {isMobile ? <Logo className={styles.logo} /> : <FullLogo className={styles.logo} />}
        </NextLink>

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
