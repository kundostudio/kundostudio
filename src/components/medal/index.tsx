import { AnimatePresence, motion, MotionProps } from "framer-motion";
import Image from "next/image";

import { useStore } from "~/lib/store";
import { cn } from "~/lib/utils";
import { Multiplier } from "~/types";

import styles from "./medal.module.scss";

type Props = {
  type: Multiplier;
} & React.HTMLProps<HTMLDivElement> &
  MotionProps &
  any;

export function Medal({
  type,
  className,
  medalYOffset1,
  medalBlur1,
  medalYOffset2,
  medalBlur2,
  logoYOffset1,
  logoBlur1,
  logoYOffset2,
  logoBlur2,
  index,
  ...props
}: Props) {
  const theme = useStore((s) => s.theme);

  const wrapperStyle = {
    domain_holder: styles.wrapperBase,
    subdomain_holder: styles.wrapperBase,
    MEOW: styles.wrapperBase,
    FIVE: styles.wrapperBase,
    TEN: styles.wrapperBase,
    A: styles.wrapperBase,
    X: styles.wrapperBase,
    WWW: styles.wrapperWWW,
  }[type];

  const medalShadowColor1 = {
    stereo: "rgba(85, 138, 1, 0.5)",
    sky: "rgba(1, 179, 203, 0.5)",
    cake: "rgba(218, 71, 255, 0.5)",
    peach: "rgba(245, 135, 0, 0.5)",
    wave: "rgba(0, 72, 255, 0.5)",
    neon: "rgba(139, 0, 0, 0.5)",
    undefined: "none",
  }[theme.name || "undefined"];

  const medalShadowColor2 = {
    stereo: "rgba(67, 117, 28, 0.8)",
    sky: "rgba(39, 150, 165, 0.8)",
    cake: "rgba(204, 0, 255, 0.8)",
    peach: "rgba(84, 54, 18, 0.8)",
    wave: "rgba(28, 53, 117, 0.8)",
    neon: "rgba(117, 28, 28, 0.8)",
    undefined: "none",
  }[theme.name || "undefined"];

  const logoShadowColor1 = {
    stereo: "rgba(55, 66, 0, 0.5)",
    sky: "rgba(0, 58, 66, 0.5)",
    cake: "rgba(0, 58, 66, 0.5)",
    peach: "rgba(66, 35, 0, 0.5)",
    wave: "rgba(0, 19, 66, 0.5)",
    neon: "rgba(66, 0, 0, 0.5)",
    undefined: "none",
  }[theme.name || "undefined"];

  const logoShadowColor2 = {
    stereo: "rgba(55, 66, 0, 0.9)",
    sky: "rgba(0, 58, 66, 0.9)",
    cake: "rgba(0, 58, 66, 0.9)",
    peach: "rgba(66, 35, 0, 0.9)",
    wave: "rgba(0, 19, 66, 0.9)",
    neon: "rgba(66, 0, 0, 0.9)",
    undefined: "none",
  }[theme.name || "undefined"];

  const medalShadows = `drop-shadow(0px ${medalYOffset1}px ${medalBlur1}px ${medalShadowColor1}) drop-shadow(0px ${medalYOffset2}px ${medalBlur2}px ${medalShadowColor2})`;

  const logoShadows = `drop-shadow(0px ${logoYOffset1}px ${logoBlur1}px ${logoShadowColor1}) drop-shadow(0px ${logoYOffset2}px ${logoBlur2}px ${logoShadowColor2})`;

  const GLITCH_VARIANTS = {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 0.4, 0, 0.8, 0.5, 1],
      x: [1, 0, -1, 0],
      y: [-2, 1, 0, -1, 0, 0],
      transition: { duration: 0.3, delay: index / 5, times: [0, 0.3, 0.5, 0.7, 0.9, 1] },
    },
    exit: {
      opacity: [0, 0.5, 0.8, 0],
      x: [-2, 0, -3, 0],
      y: [-1, 0, 1, 0],
      transition: { duration: 0.1, times: [0, 0.33, 0.66, 1] },
    },
  };

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={theme.name}
        variants={GLITCH_VARIANTS}
        initial="initial"
        animate="animate"
        exit="exit"
        className={cn(styles.wrapper, wrapperStyle, className)}
        {...props}
      >
        <Image
          src={`/medals/${type}-medal-${theme.name}.svg`}
          alt="medal"
          className={styles.medalBackground}
          fill
          style={{ filter: medalShadows }}
        />
        <Image
          src={`/medals/${type}-${theme.name}.svg`}
          alt="logo"
          fill
          style={{ filter: logoShadows }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
