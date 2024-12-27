import type { JSX } from "react";

import { cn } from "~/lib/utils";

import styles from "./typography.module.scss";

function H1({ className, ...props }: JSX.IntrinsicElements["h1"]) {
  return <h1 className={cn("", className)} {...props} />;
}

function H2({ className, ...props }: JSX.IntrinsicElements["h2"]) {
  return <h2 className={cn(styles.h2, className)} {...props} />;
}

function H3({ className, ...props }: JSX.IntrinsicElements["h3"]) {
  return <h3 className={cn(styles.h3, className)} {...props} />;
}

function H4({ className, ...props }: JSX.IntrinsicElements["h3"]) {
  return <h4 className={cn(styles.h3, className)} {...props} />;
}

function P({
  className,
  shine = false,
  ...props
}: JSX.IntrinsicElements["p"] & { shine?: boolean }) {
  return <p className={cn(styles.paragraph, shine && styles.textShine, className)} {...props} />;
}

export const Typography = {
  H1,
  H2,
  H3,
  H4,
  P,
};
