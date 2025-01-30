"use client";
import { useDraftModeEnvironment } from "next-sanity/hooks";
import type { JSX } from "react";

import { cn } from "~/lib/utils";

type Props = JSX.IntrinsicElements["a"];

export function DisableDraftMode({ className, ...props }: Props) {
  const environment = useDraftModeEnvironment();

  // Only show the disable draft mode button when outside of Presentation Tool
  if (environment !== "live" && environment !== "unknown") {
    return null;
  }

  return (
    <a
      href="/api/draft-mode/disable"
      className={cn(
        "fixed bottom-4 right-4 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
        className
      )}
      {...props}
    >
      Disable Draft Mode
    </a>
  );
}
