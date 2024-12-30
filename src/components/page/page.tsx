"use client";

import { cn } from "~/lib/utils";

type Props = JSX.IntrinsicElements["main"];

export function Page({ className, children, ...props }: Props) {
  return (
    <main className={cn("fluid-container flex-1 pt-10 md:pt-6", className)} {...props}>
      {children}
    </main>
  );
}
