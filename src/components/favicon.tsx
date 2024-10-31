"use client";

import { useStore } from "~/lib/store";

export function Favicon() {
  const theme = useStore((s) => s.theme);

  return (
    <link key={theme.name} rel="icon" href={`/favicons/favicon-${theme.name}.svg`} sizes="any" />
  );
}
