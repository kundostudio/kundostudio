"use client";

import localFont from "next/font/local";

import { Marquee } from "~/components/marquee";
import { useStore } from "~/lib/store";
import { cn } from "~/lib/utils";

import styles from "./console.module.scss";

const neue = localFont({
  src: [
    {
      path: "../../../public/fonts/neue.woff2",
      weight: "400",
      style: "regular",
    },
  ],
  variable: "--font-neue",
});

type Props = {
  className?: string;
  repeat?: number;
  speed?: number;
  offset?: number;
};

export function BottomLedScreen({ className, repeat = 4, speed = 0.5, offset = 0 }: Props) {
  const isMenuOpen = useStore((state) => state.isMenuOpen);

  return (
    <Marquee
      className={cn(styles.mindsEnteringNewWorlds, className)}
      repeat={repeat}
      speed={speed}
      offset={offset}
    >
      <span className={neue.className}>{isMenuOpen ? "menu" : "minds entering other worlds"}</span>
    </Marquee>
  );
}
