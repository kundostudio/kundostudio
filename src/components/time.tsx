"use client";

import { useEffect, useState } from "react";

import { useTime } from "~/hooks/useTime";

import { Typography } from "./typography";

export function Time() {
  const [mounted, setMounted] = useState(false);
  const time = useTime();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Typography.P className="uppercase">--:--:--</Typography.P>;
  }

  return <Typography.P className="uppercase">{time}</Typography.P>;
}
