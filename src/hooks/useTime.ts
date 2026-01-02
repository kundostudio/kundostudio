"use client";

import { useEffect, useState } from "react";

export function useTime() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const getFormattedTime = () => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Argentina/Buenos_Aires",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      return formatter.format(new Date());
    };

    // Set initial time
    setTime(getFormattedTime());

    // Update time every second
    const interval = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
}
