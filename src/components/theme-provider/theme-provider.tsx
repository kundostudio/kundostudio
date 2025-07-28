"use client";

import * as React from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Forzamos dark mode permanentemente
  return <div className="dark">{children}</div>;
}
