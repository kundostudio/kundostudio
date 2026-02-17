"use client";

import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 w-full bg-black px-5 sm:px-0 pt-6 pb-8 sm:pb-10">
      <div className="flex items-center justify-between">
        {/* Copyright */}
        <p className="text-sm text-[#F7F7F7]/40">© {new Date().getFullYear()}, Kundo Studio</p>

        {/* Nav links */}
        <nav className="flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#F7F7F7]/40 transition-colors hover:text-[#F7F7F7]/70"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
