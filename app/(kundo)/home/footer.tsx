"use client";

import Link from "next/link";
import { textStyles } from "~/components/typography";
import { cn } from "~/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

type FooterProps = {
  className?: string;
};

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("relative z-10 w-full bg-black pt-6 pb-8 sm:pb-10", className)}>
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
        {/* Copyright */}
        <p className={cn(textStyles.caption, "text-primary/40")}>&copy; {new Date().getFullYear()}, Kundo Studio</p>

        {/* Nav links */}
        <nav className="flex items-center gap-6 sm:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(textStyles.caption, "font-medium text-primary/40 transition-colors hover:text-primary/70")}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
