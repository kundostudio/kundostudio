"use client";

import { useMediaQuery } from "@studio-freight/hamo";
import Link from "next/link";

import { ThemeSelector } from "~/components/theme-selector";
import { Typography } from "~/components/typography";
import Logo from "~/public/logo.svg";

export function Footer() {
  const isTabletUp = useMediaQuery("(min-width: 768px)");

  return (
    <footer className="flex items-center justify-between p-4 fluid-container pb-16 md:pb-12">
      {isTabletUp && <Logo className="h-6 w-auto" />}
      <nav className="flex flex-col -translate-x-2 md:translate-x-0 items-start md:flex-row md:items-center gap-2 md:gap-4">
        <Link href="/">
          <Typography.P className="uppercase text-secondary px-2 py-1">home</Typography.P>
        </Link>
        <Link href="/work">
          <Typography.P className="uppercase text-secondary px-2 py-1">work</Typography.P>
        </Link>
        <Link href="/about">
          <Typography.P className="uppercase text-secondary px-2 py-1">about</Typography.P>
        </Link>
        <Link href="/contact">
          <Typography.P className="uppercase text-secondary px-2 py-1">contact</Typography.P>
        </Link>
      </nav>
      {isTabletUp ? (
        <ThemeSelector />
      ) : (
        <nav className="flex h-full items-end justify-between gap-2 translate-x-2 md:translate-x-0">
          <a href="https://x.com/kundostudio" target="_blank" rel="noopener noreferrer">
            <Typography.P className="uppercase text-primary px-2 py-1">X (twitter)</Typography.P>
          </a>
        </nav>
      )}
    </footer>
  );
}
