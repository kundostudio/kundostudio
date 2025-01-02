"use client";

import { useTheme } from "next-themes";

import { cn } from "~/lib/utils";

import { Typography } from "../typography";

const THEME_OPTIONS = ["system", "light", "dark"] as const;

type Props = JSX.IntrinsicElements["div"];

export function ThemeSelector({ className, ...props }: Props) {
  const { theme, setTheme } = useTheme();

  return (
    <div className={cn("flex gap-2", className)} {...props}>
      {THEME_OPTIONS.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`px-2 py-1 transition-colors ${
            theme === t ? "text-primary" : "text-secondary hover:text-primary"
          }`}
        >
          <Typography.P className="uppercase">{t}</Typography.P>
        </button>
      ))}
    </div>
  );
}
