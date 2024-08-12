"use client";

import { useSearchParams } from "next/navigation";

export function useDebug() {
  const params = useSearchParams();
  const debug = params.has("debug");

  return debug;
}
