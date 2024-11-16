"use client";

import * as Toggle from "@radix-ui/react-toggle";
import { motion } from "framer-motion";
import { useCallback, useRef } from "react";

import { useSound } from "~/hooks/useSound";
import { useStore } from "~/lib/store";
import { cn } from "~/lib/utils";
// @ts-ignore
import buttonSound from "~/public/sounds/button.mp3";

import styles from "./music-toggle.module.scss";

const bars = [0.4, 0.7, 0.5, 0.8, 0.3, 0.6, 0.4];

const barVariants = {
  on: (i: number) => ({
    height: ["20%", "100%", "20%"],
    transition: {
      repeat: Infinity,
      duration: 0.6,
      ease: "easeInOut",
      delay: i * Math.random() * 0.1,
      repeatDelay: Math.random() * 0.5,
    },
  }),
  off: {
    height: "20%",
    transition: {
      duration: 0.4,
    },
  },
};

export function MusicToggle({ className }: { className?: string }) {
  const [playHoverSound] = useSound(buttonSound);
  const musicEnabled = useStore((state) => state.musicEnabled);
  const { setMusicEnabled } = useStore.getState();
  const lastToggleTime = useRef(0);
  const DEBOUNCE_TIME = 300;

  const handleMouseEnter = useCallback(() => {
    playHoverSound();
  }, [playHoverSound]);

  const handlePressedChange = (pressed: boolean) => {
    const now = Date.now();
    if (now - lastToggleTime.current >= DEBOUNCE_TIME) {
      lastToggleTime.current = now;
      setMusicEnabled(pressed);
    }
  };

  return (
    <Toggle.Root
      className={cn(styles.musicToggle, className)}
      aria-label="Toggle music"
      onMouseEnter={handleMouseEnter}
      pressed={musicEnabled}
      onPressedChange={handlePressedChange}
    >
      <span className={styles.corner} />
      <span className={styles.corner} />
      <span className={styles.corner} />
      <span className={styles.corner} />
      <div className={styles.bars}>
        {bars.map((_, i) => (
          <motion.div
            key={i}
            className={styles.bar}
            variants={barVariants}
            animate={musicEnabled ? "on" : "off"}
            custom={i}
          />
        ))}
      </div>
    </Toggle.Root>
  );
}
