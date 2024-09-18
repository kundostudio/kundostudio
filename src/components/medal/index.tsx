import { Suspense, lazy, useMemo } from "react";

import { useStore } from "~/lib/store";
import { cn } from "~/lib/utils";
import { Multiplier } from "~/types";

import styles from "./medal.module.scss";

type Props = {
  type: Multiplier;
} & React.HTMLProps<HTMLDivElement>;

export function Medal({ type, className }: Props) {
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

  const mainFilter = {
    stereo: "drop-shadow(0px 3.76px 15.06px rgba(55, 66, 0, 0.5))",
    grid: "none",
    horizon: "drop-shadow(0px 2px 6px rgba(16, 137, 161, 0.5))",
    wave: "drop-shadow(0px 2px 16px rgba(86, 19, 186, 0.5))",
    undefined: "none",
  }[theme.name || "undefined"];

  const secondaryFilter = {
    stereo: "drop-shadow(0px 1.88px 5.65px rgba(55, 66, 0, 0.8))",
    grid: "none",
    horizon: "none",
    wave: "none",
    undefined: "none",
  }[theme.name || "undefined"];

  const wrapperStyle = {
    MEOW: styles.wrapperBase,
    FIVE: styles.wrapperBase,
    TEN: styles.wrapperBase,
    A: styles.wrapperBase,
    X: styles.wrapperBase,
    WWW: styles.wrapperWWW,
  }[type];

  const logoStyle = {
    MEOW: styles.logoMeow,
    FIVE: styles.logoFive,
    TEN: styles.logoTen,
    A: styles.logoA,
    X: styles.logoX,
    WWW: styles.logoWWW,
  }[type];

  return (
    <Suspense>
      <div
        className={cn(styles.medalWrapper, wrapperStyle, className)}
        style={{ filter: mainFilter }}
      >
        <MedalBase className={styles.medalBackground} style={{ filter: secondaryFilter }} />
        <Logo className={logoStyle} />
      </div>
    </Suspense>
  );
}
