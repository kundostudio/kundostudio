"use client";

import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, useCallback, useEffect, useState } from "react";

import { useViewport } from "~/hooks/useViewport";
import { useStore } from "~/lib/store";
import { cn } from "~/lib/utils";
import Logo from "~/public/intro-logo.svg";
import LogoFinal from "~/public/logo.svg";

import { HackerText } from "../hacker-text";

import { Border } from "./border";
import { DotsBackground } from "./dots-background";
import styles from "./loader.module.scss";

type Stage = 0 | 1 | 2 | 3;

const Blueprint = forwardRef<HTMLDivElement, {}>((props, ref) => {
  const viewport = useViewport("mobile");
  const isUpperMobile = viewport !== "mobile" && viewport !== "mobileXL";
  return (
    <motion.div
      className={styles.blueprint}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      <Border className={styles.border} />
      <Border className={styles.border} delay={0.4} />
      <Border className={styles.border} delay={0.6} />
      <Border className={styles.border} delay={0.3} />
      <Border className={styles.border} delay={0.1} />
      <Border className={styles.border} delay={0.2} />
      <Border className={styles.border} delay={0.8} />
      <Border className={styles.border} delay={0.5} />
      <Border className={styles.border} delay={0.6} />
      <Border className={styles.border} delay={0.3} />
      <Border className={styles.border} delay={0.7} />

      <motion.div
        className={cn(styles.dashedLineH, styles.dashedLine1)}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.div
        className={cn(styles.dashedLineH, styles.dashedLine2)}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.div
        className={cn(styles.dashedLineH, styles.dashedLine3)}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.div
        className={cn(styles.dashedLineV, styles.dashedLine4)}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.div
        className={cn(styles.dashedLineV, styles.dashedLine5)}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.div
        className={cn(styles.dashedLineV, styles.dashedLine6)}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.div
        className={cn(styles.dashedLineV, styles.dashedLine7)}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.div
        className={styles.textWrapper}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <HackerText className={cn(styles.block, styles.text)}>meow</HackerText>
        <div className={styles.block}>
          <HackerText className={styles.text} letters="01">
            [01]
          </HackerText>
          <HackerText className={styles.text} letters="01">
            [01]
          </HackerText>
        </div>
        <div className={styles.block}>
          {isUpperMobile && <HackerText className={styles.text}>development platform</HackerText>}
          <HackerText className={styles.text}>©2024</HackerText>
        </div>
        <div className={styles.block}>
          <HackerText className={styles.text} letters="01">
            [01]
          </HackerText>
          <HackerText className={styles.text} letters="01">
            [01]
          </HackerText>
        </div>
        <div className={styles.block}>
          <HackerText className={styles.text}>unreal engine</HackerText>
        </div>
        <div className={styles.block}>
          <HackerText className={styles.text} letters="01">
            [01]
          </HackerText>
          <HackerText className={styles.text} letters="01">
            [01]
          </HackerText>
          <HackerText className={styles.text} letters="01">
            [01]
          </HackerText>
        </div>
        <div className={styles.block}>
          <HackerText className={styles.text} letters="01">
            [01]
          </HackerText>
          <HackerText className={styles.text} letters="01">
            [01]
          </HackerText>
        </div>
        <div className={styles.block}>
          <HackerText className={styles.text}>accelerate development</HackerText>
        </div>
        <div className={styles.block}>
          <HackerText className={styles.text} letters="01">
            [01]
          </HackerText>
        </div>
        <div className={styles.block}>
          <HackerText className={styles.text}>meow</HackerText>
        </div>
        <div className={styles.block}>
          <HackerText className={styles.text} letters="01">
            [01]
          </HackerText>
        </div>
      </motion.div>
    </motion.div>
  );
});

Blueprint.displayName = "Blueprint";

const BlurLogo = forwardRef<HTMLDivElement, { onComplete: () => void }>(({ onComplete }, ref) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          delay: 1.3,
          duration: 0.5,
        },
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.logo}
      onAnimationComplete={onComplete}
    >
      <Logo />
    </motion.div>
  );
});

BlurLogo.displayName = "BlurLogo";

const SolidLogo = forwardRef<HTMLDivElement, {}>((props, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1, ease: "easeOut" } }}
      transition={{ duration: 0.5 }}
      className={styles.solidLogo}
    />
  );
});

SolidLogo.displayName = "SolidLogo";

const FinalLogo = forwardRef<HTMLDivElement, {}>((props, ref) => {
  const viewport = useViewport();
  const { setAppReady } = useStore.getState();

  if (!viewport) return null;

  const offset = {
    mobile: -158,
    mobileXL: -172,
    tablet: -176,
    laptop: -182,
    desktop: -187,
    desktopXL: -187,
  }[viewport];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 1, x: -2 }}
      animate={{
        opacity: 1,
        y: offset,
        transition: { duration: 0.5, delay: 0.1, ease: "easeOut" },
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.logo}
      onAnimationComplete={() => {
        setAppReady(true);
        // Establecer el color de la barra de desplazamiento
        // document.documentElement.style.setProperty("--scrollbar-color", "var(--primary-color)");
        // document.documentElement.style.setProperty(
        //   "--scrollbar-bg-color",
        //   "var(--background-color)"
        // );
        // document.documentElement.style.scrollbarColor =
        //   "var(--scrollbar-color) var(--scrollbar-bg-color)";
      }}
    >
      <LogoFinal />
    </motion.div>
  );
});

FinalLogo.displayName = "FinalLogo";

const WIDTHS = {
  mobile: 189.4,
  mobileXL: 242,
  tablet: 306.9,
  laptop: 306.9,
  desktop: 347.5,
  desktopXL: 347.5,
};

const HEIGHTS = {
  mobile: 108,
  mobileXL: 138,
  tablet: 175,
  laptop: 175,
  desktop: 199,
  desktopXL: 199,
};

const BLOCK_WIDTHS = {
  mobile: 54.1,
  mobileXL: 69.1,
  tablet: 87.6,
  laptop: 87.6,
  desktop: 99.7,
  desktopXL: 99.7,
};

export function LoaderUI({ loaded = false }: { loaded?: boolean }) {
  const appReady = useStore((state) => state.appReady);
  const viewport = useViewport();
  const [stage, setStage] = useState<Stage>(appReady ? 3 : 0);
  const [revealReady, setRevealReady] = useState(appReady ? true : false);

  const ready = revealReady && loaded;

  const isMobile = viewport === "mobile" || viewport === "mobileXL";
  const smallMultiplier = isMobile ? 0.5 : 0.8;

  const width = viewport
    ? {
        0: WIDTHS[viewport] * 1.2,
        1: WIDTHS[viewport] * smallMultiplier,
        2: WIDTHS[viewport] * smallMultiplier,
        3: WIDTHS[viewport],
      }[stage]
    : null;

  const height = viewport
    ? {
        0: HEIGHTS[viewport] * 1.2,
        1: HEIGHTS[viewport] * smallMultiplier,
        2: HEIGHTS[viewport] * smallMultiplier,
        3: HEIGHTS[viewport],
      }[stage]
    : null;

  const blockWidth = viewport
    ? {
        0: BLOCK_WIDTHS[viewport] * 1.2,
        1: BLOCK_WIDTHS[viewport] * smallMultiplier,
        2: BLOCK_WIDTHS[viewport] * smallMultiplier,
        3: BLOCK_WIDTHS[viewport],
      }[stage]
    : null;

  const handleNextStage = useCallback(() => {
    if (ready) {
      setStage((prev) => (prev < 3 ? prev + 1 : 3) as Stage);
    }
  }, [ready]);

  useEffect(() => {
    if (ready) {
      handleNextStage();
    }
  }, [ready, handleNextStage]);

  if (!viewport) return null;

  return (
    <div className={styles.wrapper} style={{ pointerEvents: stage >= 3 ? "none" : "auto" }}>
      <AnimatePresence>
        {stage === 0 && (
          <div className={styles.blurprintBackgroud}>
            <DotsBackground />
          </div>
        )}
      </AnimatePresence>
      <motion.div
        className={styles.logoWrapper}
        initial={
          {
            opacity: 1,
            width: WIDTHS[viewport] * 1.2,
            height: HEIGHTS[viewport] * 1.2,
            "--block-width": `${BLOCK_WIDTHS[viewport] * 1.2}px`,
            "--stage": stage,
          } as any
        }
        animate={{ width, height, "--block-width": `${blockWidth}px`, "--stage": stage } as any}
        transition={{
          duration: 0.7,
          ease: stage === 3 ? "easeOut" : "anticipate",
        }}
        onAnimationComplete={handleNextStage}
      >
        <AnimatePresence mode="popLayout">
          {stage === 0 && <Blueprint key="blueprint" />}
          {(stage === 0 || stage === 1) && (
            <BlurLogo key="blur-logo" onComplete={() => setRevealReady(true)} />
          )}
          {stage === 2 && <SolidLogo key="solid-logo" />}
          {stage === 3 && <FinalLogo key="final-logo" />}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
