import { motion, MotionProps } from "framer-motion";
import { lazy, Suspense } from "react";

import { cn } from "~/lib/utils";
import { Multiplier } from "~/types";

import styles from "./medal.module.scss";

type Props = {
  type: Multiplier;
} & React.HTMLProps<HTMLDivElement> &
  MotionProps;

export function Medal({ type, className, ...props }: Props) {
  const MedalBase = lazy(() => import(`~/public/medals/${type.toLowerCase()}-medal.svg`));
  const Logo = lazy(() => import(`~/public/medals/${type.toLowerCase()}.svg`));

  const wrapperStyle = {
    MEOW: styles.wrapperBase,
    FIVE: styles.wrapperBase,
    TEN: styles.wrapperBase,
    A: styles.wrapperBase,
    X: styles.wrapperBase,
    WWW: styles.wrapperWWW,
  }[type];

  const medalShadows =
    "drop-shadow(0px 1.88px 5.65px rgba(85, 138, 1, 0.8)) drop-shadow(0px 3.76px 15.06px rgba(85, 138, 1, 0.5))";

  const logoShadows =
    "drop-shadow(0px 3.76px 15.06px rgba(55, 66, 0, 0.5)) drop-shadow(0px 0.94px 3.76px rgba(55, 66, 0, 0.9))";

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
