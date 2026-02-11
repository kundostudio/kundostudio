"use client";

import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 w-full bg-black px-6 pt-6 pb-8 sm:pb-10">
      <div className="max-w-[1008px] mx-auto flex items-center justify-between">
        {/* Copyright */}
        <p className="text-sm text-white/40">© 2025, Kundo Studio</p>

        {/* Nav links */}
        <nav className="flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/40 transition-colors hover:text-white/70"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
