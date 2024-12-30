"use client";

import { useMediaQuery } from "@studio-freight/hamo";

import { Link } from "~/components/link";
import { ThemeSelector } from "~/components/theme-selector";
import { Typography } from "~/components/typography";
import Logo from "~/public/logo.svg";

export function Footer() {
  const isTabletUp = useMediaQuery("(min-width: 768px)");

  return (
    <footer className="flex items-center justify-between p-4 fluid-container">
      {isTabletUp && <Logo className="h-6 w-auto" />}
      <nav className="flex flex-col items-start md:flex-row md:items-center gap-4 md:gap-6">
        <Link href="/">
          <Typography.P className="uppercase text-secondary">home</Typography.P>
        </Link>
        <Link href="/work">
          <Typography.P className="uppercase text-secondary">work</Typography.P>
        </Link>
        <Link href="/about">
          <Typography.P className="uppercase text-secondary">about</Typography.P>
        </Link>
        <Link href="/contact">
          <Typography.P className="uppercase text-secondary">contact</Typography.P>
        </Link>
      </nav>
      {isTabletUp && <ThemeSelector />}
    </footer>
  );
}
