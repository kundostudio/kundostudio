"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import Logo from "~/public/logo.svg";

import { Link } from "../link";

export function Footer() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="flex items-center justify-between p-4 border-t border-tertiary-color">
      <Logo className="h-6 w-auto" />
      <div className="flex gap-6">
        <Link href="/">home</Link>
        <Link href="/work">work</Link>
        <Link href="/about">about</Link>
        <Link href="/contact">contact</Link>
      </div>
      {mounted && (
        <div className="flex gap-4">
          {["system", "light", "dark"].map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`px-3 py-1 rounded-md transition-colors ${
                theme === t ? "bg-tertiary-color text-primary-color" : "hover:bg-tertiary-color/50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}
    </footer>
  );
}
