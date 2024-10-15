import { motion, MotionProps } from "framer-motion";
import { lazy, Suspense, useMemo } from "react";

import { useStore } from "~/lib/store";
import { cn } from "~/lib/utils";
import { Multiplier } from "~/types";

import styles from "./medal.module.scss";

type Props = {
  type: Multiplier;
} & React.HTMLProps<HTMLDivElement> &
  MotionProps;

export function Medal({ type, className, ...props }: Props) {
  const theme = useStore((s) => s.theme);

  const MedalBase = useMemo(() => {
    const t = type.toLowerCase();
    const variant = theme.name;

    return lazy(() => import(`~/public/medals/${t}-medal-${variant}.svg`));
  }, [type, theme.name]);

  const Logo = useMemo(() => {
    const t = type.toLowerCase();
    const variant = theme.name;

    return lazy(() => import(`~/public/medals/${t}-${variant}.svg`));
  }, [type, theme.name]);

  const wrapperStyle = {
    MEOW: styles.wrapperBase,
    FIVE: styles.wrapperBase,
    TEN: styles.wrapperBase,
    A: styles.wrapperBase,
    X: styles.wrapperBase,
    WWW: styles.wrapperWWW,
  }[type];

  const medalShadows = {
    stereo:
      "drop-shadow(0px 1.88px 5.65px rgba(85, 138, 1, 0.8)) drop-shadow(0px 3.76px 15.06px rgba(85, 138, 1, 0.5))",
    grid: "none",
    horizon: "drop-shadow(0px 2px 6px rgba(16, 137, 161, 0.5))",
    wave: "drop-shadow(0px 2px 16px rgba(86, 19, 186, 0.5))",
    undefined: "none",
  }[theme.name || "undefined"];

  const logoShadows = {
    stereo:
      "drop-shadow(0px 3.76px 15.06px rgba(55, 66, 0, 0.5)) drop-shadow(0px 0.94px 3.76px rgba(55, 66, 0, 0.9))",
    grid: "drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.5)) drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.9))",
    horizon: "none",
    wave: "none",
    undefined: "none",
  }[theme.name || "undefined"];

  return (
    <motion.div className={cn(styles.wrapper, wrapperStyle, className)} {...props}>
      <Suspense>
        <div className={styles.medalWrapper}>
          <MedalBase className={styles.medalBackground} style={{ filter: medalShadows }} />
          <Logo style={{ filter: logoShadows }} />
        </div>
      </Suspense>
    </motion.div>
  );
}
