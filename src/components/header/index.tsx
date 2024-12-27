"use client";

import { useMediaQuery } from "@studio-freight/hamo";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { useStore } from "~/lib/store";

import styles from "./header.module.scss";
import { Menu } from "./menu";
import { MenuTrigger } from "./menu/trigger";

export function Header() {
  const ref = useRef(null);
  const isMobileXS = useMediaQuery("(max-width: 640px)");
  const pathname = usePathname();
  const isMenuOpen = useStore((state) => state.isMenuOpen);
  const { setIsMenuOpen } = useStore.getState();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname, setIsMenuOpen]);

  const handleToggleMenu = () => {
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
      <nav className="flex gap-6">
        <Link href="/">home</Link>
        <Link href="/work">work</Link>
        <Link href="/about">about</Link>
        <Link href="/contact">contact</Link>
      </nav>
    </motion.header>
  );
}
