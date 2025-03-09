"use client";

import { useMediaQuery } from "@studio-freight/hamo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { Time } from "~/components/time";
import { Typography } from "~/components/typography";
import { useStore } from "~/lib/store";
import { cn } from "~/lib/utils";
import Logo from "~/public/logo.svg";

import { Item } from "./item";
import { Menu } from "./menu";
import { MenuTrigger } from "./menu-trigger";

export const NAVIGATION_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const pathname = usePathname();
  const isMenuOpen = useStore((state) => state.isMenuOpen);
  const { setIsMenuOpen } = useStore.getState();
 
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname, setIsMenuOpen]);

  const handleLogoClick = () => {
    if (pathname === "/") {
      setIsMenuOpen(false);
    }
  };

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (isMobile) {
    return (
      <>
        <header
          className={cn(
            "fixed top-0 left-0 right-0 z-[70] h-10 mx-4 bg-background flex justify-between items-center",
            !isMenuOpen && "border-b border-tertiary"
          )}
        >
          <Link href="/" onClick={handleLogoClick}>
            <Logo className="h-6 w-auto" />
          </Link>
          <MenuTrigger isOpen={isMenuOpen} onClick={handleToggleMenu} className="translate-x-1" />
        </header>
        <Menu isOpen={isMenuOpen}>
          <div className="flex h-full w-full flex-col justify-end items-start gap-4 pb-16">
            {NAVIGATION_ITEMS.map((item) => (
              <a key={item.href} href={item.href}>
                <Typography.H3>{item.label}</Typography.H3>
              </a>
            ))}
          </div>
        </Menu>
      </>
    );
  }

  return (
    <header className="fixed flex justify-center top-0 left-0 h-6 border-b border-solid border-tertiary w-full z-50 bg-background">
      <nav className="flex justify-between items-center fluid-container">
        {NAVIGATION_ITEMS.map((item) => (
          <Item key={item.href} {...item} />
        ))}
        <Time />
      </nav>
    </header>
  );
}
